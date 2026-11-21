import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
    {
        // chosen by the host after the room is created
        problem: {
            type: String,
            default: null,
        },
        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            default: null,
        },
        host: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        participant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        status: {
            type: String,
            enum: ["active", "completed"],
            default: "active",
        },
        // stream video call ID
        callId: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);

export default Session;