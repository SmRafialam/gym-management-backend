import mongoose from 'mongoose';

const ClassScheduleSchema = new mongoose.Schema({
    date: { 
        type: Date, 
        required: true 
    },
    time: { 
        type: String, 
        required: true 
    },
    trainerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    traineeIds: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }], 
    capacity: { 
        type: Number, 
        default: 10 
    },
}, { timestamps: true });

const ClassSchedule= mongoose.model('ClassSchedule', ClassScheduleSchema);
export default ClassSchedule;
