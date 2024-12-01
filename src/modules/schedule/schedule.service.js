import ClassSchedule from '../schedule/schedule.model.js';
import User from '../auth/auth.model.js'; 

const createSchedule = async (date, time, trainerId) => {
        const trainer = await User.findById(trainerId);
        if (!trainer || trainer.role !== 'Trainer') {
            throw new Error('Invalid trainer ID or user is not a trainer');
        }

        // Check daily limit of 5 schedules
        const count = await ClassSchedule.countDocuments({ date });
        console.log(count);
        if (count >= 5) 
            throw new Error('Daily limit of 5 schedules reached');

        const schedule = new ClassSchedule({ date, time, trainerId });
        return schedule.save();
    }

const bookClass = async (traineeIds, scheduleId) => {
        const trainee = await User.find({ role: 'Trainee' });
        console.log(trainee);

        if (!trainee) {
            throw new Error('Invalid trainee ID or user is not a trainee');
        }

        const schedule = await ClassSchedule.findById(scheduleId);
        // console.log(schedule);

        if (!schedule) {
            throw new Error('Schedule not found');
        }
        if (schedule.traineeIds.length >= schedule.capacity) {
            throw new Error('Class is full');
        }
        // Prevent duplicate booking
        if (schedule.traineeIds.includes(traineeIds)) {
            throw new Error('Trainee already booked this class');
        }

        schedule.traineeIds.push(traineeIds);
        return schedule.save();
    }

const assignTrainer = async (scheduleId, trainerId) => {
        try {
            const schedule = await ClassSchedule.findById(scheduleId);
            if (!schedule) {
                throw new Error('Schedule not found');
            }
    
            const trainer = await User.findOne({ _id: trainerId, role: 'Trainer' });

            if (!trainer) {
                throw new Error('Trainer not found');
            }

            if (schedule.trainerId) {
                throw new Error("Schedule already has a trainer assigned.");

            }
    
            schedule.trainerId = trainerId;
            await schedule.save();

        } catch (error) {
            console.log(error);
        }
    };

export const ScheduleService = { createSchedule, bookClass, assignTrainer };
