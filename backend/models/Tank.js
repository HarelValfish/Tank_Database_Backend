import mongoose from "mongoose";

/**
 * Specifications sub-document. Stored as an embedded object on each tank.
 * Kept as free-form strings ("65 t", "4", "70 km/h") so units stay flexible.
 */
const specificationsSchema = new mongoose.Schema(
  {
    weight: { type: String, trim: true, default: "" },   // e.g. "65 tonnes"
    crewSize: { type: String, trim: true, default: "" },  // e.g. "4 (commander, gunner, loader, driver)"
    speed: { type: String, trim: true, default: "" },     // e.g. "70 km/h (road)"
  },
  { _id: false }
);

const tankSchema = new mongoose.Schema(
  {
    tankName: {
      type: String,
      required: [true, "tankName is required"],
      trim: true,
    },
    variant: {
      type: String,
      trim: true,
      default: "",
    },
    armament: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    serviceTime: {
      type: String,
      trim: true,
      default: "",
    },
    imageUrl: {
      type: String,
      trim: true,
      default: "",
    },
    history: {
      type: String,
      trim: true,
      default: "",
    },
    specifications: {
      type: specificationsSchema,
      default: () => ({}),
    },
  },
  {
    timestamps: true, // adds createdAt / updatedAt
    toJSON: {
      virtuals: true,
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Text index powers the keyword search on the dashboard.
tankSchema.index({ tankName: "text", variant: "text", armament: "text", description: "text" });

export const Tank = mongoose.model("Tank", tankSchema);
