function generateCalendar(containerId, year, month, events) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
  
    const table = document.createElement('table');
    table.className = 'calendar';
  
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');
    daysOfWeek.forEach((d) => {
      const th = document.createElement('th');
      th.textContent = d;
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);
  
    const tbody = document.createElement('tbody');
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
  
    let row = document.createElement('tr');
    for (let i = 0; i < firstDay; i++) {
      row.appendChild(document.createElement('td'));
    }
  
    for (let day = 1; day <= daysInMonth; day++) {
      if (row.children.length === 7) {
        tbody.appendChild(row);
        row = document.createElement('tr');
      }
  
      const cell = document.createElement('td');
      const cellDate = new Date(year, month, day);
      const dateDiv = document.createElement('div');
      dateDiv.className = 'date';
      dateDiv.textContent = day;
      cell.appendChild(dateDiv);
  
      events.forEach((ev) => {
        if (cellDate >= ev.start && cellDate <= ev.end) {
          const evDiv = document.createElement('div');
          evDiv.className = 'event';
          if (ev.time && cellDate.getTime() === ev.start.getTime()) {
            evDiv.textContent = `${ev.time} – ${ev.title}`;
          } else {
            evDiv.textContent = ev.title;
          }
          cell.appendChild(evDiv);
        }
      });
  
      row.appendChild(cell);
    }
  
    while (row.children.length < 7) {
      row.appendChild(document.createElement('td'));
    }
    tbody.appendChild(row);
    table.appendChild(tbody);
    container.appendChild(table);
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const events = [
      {
        start: new Date(2025, 4, 3),
        end: new Date(2025, 4, 3),
        time: '1:00 pm',
        title: 'Ender Dragon Fight'
      },
      {
        start: new Date(2025, 4, 9),
        end: new Date(2025, 4, 9),
        time: '5:00 pm',
        title: 'End Busting'
      },
      {
        start: new Date(2025, 4, 15),
        end: new Date(2025, 4, 15),
        time: '8:00 pm',
        title: 'Server-wide group screenshot'
      },
      {
        start: new Date(2025, 4, 24),
        end: new Date(2025, 4, 25),
        title: 'Server-wide item and ship trading event'
      }
    ];
  
    generateCalendar('calendar', 2025, 4, events);
  });
  