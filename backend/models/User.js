import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please provide your first name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please provide your last name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please provide a phone number'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    age: {
      type: Number,
      min: 18,
      max: 120,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    interestedIn: {
      type: [String],
      enum: ['male', 'female', 'both'],
      default: ['both'],
    },
    interests: [String],
    relationshipGoal: {
      type: String,
      enum: ['dating', 'serious', 'marriage', 'friendship', 'not-sure'],
    },
    location: {
      address: String,
      city: String,
      state: String,
      coordinates: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point',
        },
        coordinates: {
          type: [Number], // [longitude, latitude]
        },
      },
    },
    height: {
      value: Number,
      unit: {
        type: String,
        enum: ['cm', 'ft'],
      },
    },
    bodyType: {
      type: String,
      enum: ['slim', 'athletic', 'average', 'curvy', 'muscular'],
    },
    religion: String,
    education: String,
    profession: String,
    smokingStatus: {
      type: String,
      enum: ['yes', 'no', 'occasionally'],
    },
    drinkingStatus: {
      type: String,
      enum: ['yes', 'no', 'occasionally'],
    },
    galleryImages: [
      {
        url: String,
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isPremium: {
      type: Boolean,
      default: false,
    },
    premiumExpiry: Date,
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    banReason: {
      type: String,
      default: '',
    },
    bannedAt: Date,
    bannedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      default: null,
    },
    lastSeen: Date,
    blockedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    reportedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

// Index for geospatial queries
userSchema.index({ 'location.coordinates': '2dsphere' });

// Method to compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
