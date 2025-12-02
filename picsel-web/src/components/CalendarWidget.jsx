import React, { useState } from 'react';
import './CalendarWidget.css';

const CalendarWidget = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  // State to track which event is being viewed
  const [activeEvent, setActiveEvent] = useState(null);

  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const adjustedStart = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    const days = [];
    for (let i = 0; i < adjustedStart; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  };

  const calendarDays = getDaysInMonth(currentDate);
  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  // --- HANDLERS ---
  
  // Desktop: Show on hover
  const handleMouseEnter = (ev) => {
    if (window.innerWidth > 768) { // Only allow hover on desktop
        setActiveEvent(ev);
    }
  };

  // Desktop: Hide on leave
  const handleMouseLeave = () => {
    if (window.innerWidth > 768) {
        setActiveEvent(null);
    }
  };

  // Mobile: Toggle on click
  const handleClick = (ev, e) => {
    e.stopPropagation(); // Prevent bubbling
    setActiveEvent(ev);
  };

  return (
    <div className="calendar-widget">
      
      {/* HEADER */}
      <div className="cal-header">
        <span className="cal-month">{monthName} {year}</span>
        <div className="cal-controls">
          <button onClick={prevMonth}>&lt;</button>
          <button onClick={nextMonth}>&gt;</button>
        </div>
      </div>

      {/* GRID */}
      <div className="cal-grid">
        {weekDays.map(day => <div key={day} className="cal-day-label">{day}</div>)}

        {calendarDays.map((day, index) => {
          if (!day) return <div key={`empty-${index}`} className="cal-cell empty"></div>;

          const currentMonthNum = currentDate.getMonth() + 1;
          const dateString = `${year}-${String(currentMonthNum).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const daysEvents = events.filter(e => e.date === dateString);
          const isToday = new Date().toDateString() === new Date(year, currentDate.getMonth(), day).toDateString();

          return (
            <div key={day} className={`cal-cell ${isToday ? 'today-cell' : ''}`}>
              <span className="cal-date-num">{day}</span>
              
              <div className="cal-events-container">
                {daysEvents.map((ev, i) => (
                    <div 
                        key={i} 
                        className={`cal-pill ${i % 2 === 0 ? 'blue' : 'purple'}`}
                        // EVENT HANDLERS
                        onMouseEnter={() => handleMouseEnter(ev)}
                        onMouseLeave={handleMouseLeave}
                        onClick={(e) => handleClick(ev, e)}
                    >
                        {ev.title}
                    </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* --- THE INFO POPUP --- */}
      {activeEvent && (
        <div className="event-popup-overlay" onClick={() => setActiveEvent(null)}>
            <div className="event-popup-card">
                <button className="popup-close" onClick={() => setActiveEvent(null)}>×</button>
                <span className="popup-date">{activeEvent.date} • {activeEvent.time}</span>
                <h3 className="popup-title">{activeEvent.title}</h3>
                <div className="popup-location">📍 {activeEvent.location}</div>
                <p className="popup-desc">{activeEvent.description}</p>
            </div>
        </div>
      )}

    </div>
  );
};

export default CalendarWidget;