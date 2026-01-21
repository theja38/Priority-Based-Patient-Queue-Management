const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Server } = require("socket.io");

const User = require("./models/User");
// auth middleware can be enabled later
// const auth = require("./middleware/auth");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

// ------------------ DATABASE ------------------
mongoose
  .connect("mongodb://127.0.0.1:27017/hospitalQueue")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// ------------------ MODELS ------------------
const PatientSchema = new mongoose.Schema({
  name: String,
  token: Number,
  priority: Boolean,
  status: { type: String, default: "waiting" },
  createdAt: { type: Date, default: Date.now },
  completedAt: Date
});

const Patient = mongoose.model("Patient", PatientSchema);

// ------------------ SOCKET LOGIC ------------------
async function emitQueue() {
  const patients = await Patient.find({ status: "waiting" }).sort({
    priority: -1,
    token: 1
  });

  io.emit("queueUpdate", {
    current: patients[0] || null,
    next: patients[1] || null,
    waitingCount: patients.length
  });
}

io.on("connection", () => {
  emitQueue();
});

// ------------------ AUTH ROUTES ------------------
app.post("/auth/register", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    username: req.body.username,
    password: hashed,
    role: req.body.role
  });

  await user.save();
  res.json({ message: "User created" });
});

app.post("/auth/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(404).json({ message: "User not found" });

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(401).json({ message: "Wrong password" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    "SECRETKEY",
    { expiresIn: "1d" }
  );

  res.json({ token, role: user.role });
});

// ------------------ QUEUE ROUTES ------------------

// Register patient
app.post("/register", async (req, res) => {
  const lastPatient = await Patient.findOne().sort({ token: -1 });
  const token = lastPatient ? lastPatient.token + 1 : 1;

  const patient = new Patient({
    name: req.body.name,
    priority: req.body.priority,
    token
  });

  await patient.save();
  await emitQueue();

  res.json(patient);
});

// Complete consultation
app.put("/complete/:id", async (req, res) => {
  await Patient.findByIdAndUpdate(req.params.id, {
    status: "completed",
    completedAt: new Date()
  });

  await emitQueue();
  res.json({ message: "Consultation completed" });
});

// ------------------ AVERAGE WAITING TIME ------------------
app.get("/average-waiting-time", async (req, res) => {
  const completedPatients = await Patient.find({
    status: "completed",
    completedAt: { $ne: null }
  });

  if (completedPatients.length === 0) {
    return res.json({ averageWaitingTime: 0 });
  }

  const totalTime = completedPatients.reduce((sum, p) => {
    if (!p.completedAt || !p.createdAt) return sum;
    return sum + (p.completedAt - p.createdAt);

  }, 0);

  const averageMs = totalTime / completedPatients.length;
  const averageMinutes = Math.round(averageMs / 60000);

  res.json({ averageWaitingTime: averageMinutes });
});

// ------------------ SERVER ------------------
server.listen(5000, () => {
  console.log("Backend running on port 5000");
});
