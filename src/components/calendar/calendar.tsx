import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import AppointmentForm from '../../components/appointments/AppointmentForm';

interface Appointment {
    id: string;
    title: string;
    start: Date;
    end: Date;
    patient: string;
    doctor: string;
}

const CalendarView = () => {
    const [events, setEvents] = useState<Appointment[]>([]);
    const [formVisible, setFormVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [currentEvent, setCurrentEvent] = useState<Appointment | null>(null);
    const [formAction, setFormAction] = useState<'create' | 'edit'>('create');

    useEffect(() => {
        const stored = localStorage.getItem('appointments');
        if (stored) {
            try {
                const parsedEvents = JSON.parse(stored);
                const eventsWithDates = parsedEvents.map((event: any) => ({
                    ...event,
                    start: new Date(event.start),
                    end: new Date(event.end)
                }));
                setEvents(eventsWithDates);
            } catch (error) {
                console.error('Failed to parse appointments from localStorage', error);
            }
        }
    }, []);

    const generateId = () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    };

    const saveAppointment = (data: { patient: string; doctor: string; time: string }) => {
        if (!selectedDate) return;

        const [hour, minute] = data.time.split(':').map(Number);
        const start = new Date(selectedDate);
        start.setHours(hour, minute);
        const end = new Date(start.getTime() + 30 * 60000);

        let updatedEvents: Appointment[];

        if (formAction === 'edit' && currentEvent) {
            updatedEvents = events.map(event =>
                event.id === currentEvent.id
                    ? {
                        ...event,
                        title: `${data.patient} - ${data.doctor}`,
                        start,
                        end,
                        patient: data.patient,
                        doctor: data.doctor
                    }
                    : event
            );
        } else {
            const newEvent: Appointment = {
                id: generateId(),
                title: `${data.patient} - ${data.doctor}`,
                start,
                end,
                patient: data.patient,
                doctor: data.doctor,
            };
            updatedEvents = [...events, newEvent];
        }

        setEvents(updatedEvents);
        localStorage.setItem('appointments', JSON.stringify(updatedEvents));
        setFormVisible(false);
        setCurrentEvent(null);
    };

    const handleDateSelect = (selectInfo: { start: Date; end: Date }) => {
        setSelectedDate(selectInfo.start);
        setCurrentEvent(null);
        setFormAction('create');
        setFormVisible(true);
    };

    const handleEventClick = (clickInfo: { event: { id: string; title: string; start: Date; end: Date; extendedProps: { patient: string; doctor: string } } }) => {
        const event: Appointment = {
            id: clickInfo.event.id,
            title: clickInfo.event.title,
            start: new Date(clickInfo.event.start),
            end: new Date(clickInfo.event.end),
            patient: clickInfo.event.extendedProps.patient,
            doctor: clickInfo.event.extendedProps.doctor
        };

        setCurrentEvent(event);
        setSelectedDate(event.start);
        setFormAction('edit');
        setFormVisible(true);
    };

    const handleDelete = () => {
        if (!currentEvent) return;

        if (window.confirm(`Delete appointment with ${currentEvent.patient}?`)) {
            const updated = events.filter(e => e.id !== currentEvent.id);
            setEvents(updated);
            localStorage.setItem('appointments', JSON.stringify(updated));
            setFormVisible(false);
            setCurrentEvent(null);
        }
    };

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridDay'
                }}
                events={events.map(event => ({
                    id: event.id,
                    title: event.title,
                    start: event.start,
                    end: event.end,
                    extendedProps: {
                        patient: event.patient,
                        doctor: event.doctor
                    }
                }))}
                selectable={true}
                select={handleDateSelect}
                eventClick={handleEventClick}
                height="90vh"
                eventContent={(eventInfo) => (
                    <div>
                        <b>{eventInfo.timeText}</b>
                        <i>{eventInfo.event.title}</i>
                    </div>
                )}
            />

            {formVisible && selectedDate && (
                <AppointmentForm
                    selectedDate={selectedDate}
                    onSave={saveAppointment}
                    onClose={() => {
                        setFormVisible(false);
                        setCurrentEvent(null);
                    }}
                    editData={currentEvent ? {
                        patient: currentEvent.patient,
                        doctor: currentEvent.doctor,
                        time: `${formatTime(currentEvent.start.getHours())}:${formatTime(currentEvent.start.getMinutes())}`
                    } : null}
                    onDelete={formAction === 'edit' ? handleDelete : undefined}
                    isEdit={formAction === 'edit'}
                />
            )}
        </div>
    );
};

const formatTime = (time: number): string => {
    return time.toString().padStart(2, '0');
};

export default CalendarView;