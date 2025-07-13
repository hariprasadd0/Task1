import { useState } from 'react';
import patientsDoctors from '../../data/data.json';

interface AppointmentFormProps {
    selectedDate: Date;
    onSave: (appointment: { patient: string; doctor: string; time: string }) => void;
    onClose: () => void;
    onDelete?: () => void;
    editData?: {
        patient: string;
        doctor: string;
        time: string;
    };
    isEdit?: boolean;
}

const AppointmentForm = ({
                             selectedDate,
                             onSave,
                             onClose,
                             onDelete,
                             editData,
                             isEdit = false
                         }: AppointmentFormProps) => {
    const [patient, setPatient] = useState(editData?.patient || '');
    const [doctor, setDoctor] = useState(editData?.doctor || '');
    const [time, setTime] = useState(editData?.time || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ patient, doctor, time });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg space-y-4 w-full max-w-sm">
                <h2 className="text-xl font-bold">
                    {isEdit ? 'Edit Appointment' : 'Add Appointment'}
                </h2>
                <div>
                    <label className="block mb-1">Patient</label>
                    <select
                        className="w-full border rounded px-2 py-1"
                        value={patient}
                        onChange={(e) => setPatient(e.target.value)}
                        required
                    >
                        <option value="">Select Patient</option>
                        {patientsDoctors.patients.map((p) => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block mb-1">Doctor</label>
                    <select
                        className="w-full border rounded px-2 py-1"
                        value={doctor}
                        onChange={(e) => setDoctor(e.target.value)}
                        required
                    >
                        <option value="">Select Doctor</option>
                        {patientsDoctors.doctors.map((d) => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block mb-1">Time</label>
                    <input
                        type="time"
                        className="w-full border rounded px-2 py-1"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>
                <div className="flex justify-between">
                    <div>
                        {isEdit && onDelete && (
                            <button
                                type="button"
                                onClick={onDelete}
                                className="px-3 py-1 bg-red-600 text-white rounded"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-3 py-1 bg-gray-300 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-3 py-1 bg-blue-600 text-white rounded"
                        >
                            {isEdit ? 'Update' : 'Save'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AppointmentForm;