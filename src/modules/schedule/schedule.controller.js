import { ScheduleService } from '../schedule/schedule.service.js';

export const createSchedule = async (req, res) => {
    try {
        const { date, time, trainerId } = req.body;
        const schedule = await ScheduleService.createSchedule(date, time, trainerId);
        res.status(201).json(schedule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const bookClass = async (req, res) => {
    try {
        const { scheduleId } = req.body;
        // console.log(req.body);
        const schedule = await ScheduleService.bookClass(req.user.id, scheduleId);
        // console.log(schedule);
        res.status(200).json(schedule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getScheduleDetails = async (req, res) => {
    try {
        const { scheduleId } = req.params;

        const schedule = await ClassSchedule.findById(scheduleId)
            .populate('trainer', 'name email role') // Populate trainer details
            .populate('traineeIds', 'name email role'); // Populate trainee details

        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        res.status(200).json(schedule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
