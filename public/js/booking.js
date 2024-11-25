const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('event_id'); // รับ event_id จาก URL

// ฟังก์ชันเพื่อดึงข้อมูลอีเวนต์จาก API
function loadEventData(eventId) {
    fetch(`http://localhost:3000/event/${eventId}`) // ดึงข้อมูลจาก API โดยใช้ event_id
        .then(response => response.json())
        .then(event => {
            // เติมข้อมูลอีเวนต์ลงในฟอร์ม
            document.getElementById('eventName').textContent = event.event_name; 
            document.getElementById('eventDate').textContent = new Date(event.event_date).toLocaleString(); 
            document.getElementById('eventLocation').textContent = event.event_location; 
            document.getElementById('eventPrice').textContent = `${event.event_price} Baht`;

            // ถ้ามีภาพ ก็แสดงภาพอีเวนต์
            const eventImage = document.getElementById('eventImage');
            if (event.image_url) {
                eventImage.src = `/${event.image_url}`;
            } else {
                eventImage.src = '/default-image.jpg'; // กรณีไม่มีภาพ
            }
        })
        .catch(error => {
            console.error('Error fetching event data:', error);
        });
}

// เรียกใช้ฟังก์ชันโหลดข้อมูลอีเวนต์เมื่อหน้าเว็บโหลด
if (eventId) {
    loadEventData(eventId);
}

// ฟังก์ชันที่จะแสดงฟอร์มการจอง
function showBookingForm() {
    const bookingSection = document.querySelector('.booking-section');
    if (bookingSection) {
        bookingSection.style.display = 'block'; // แสดงฟอร์ม
    }
}

// ฟังก์ชันที่ซ่อนฟอร์มการจอง
function hideCreateEventForm() {
    const bookingSection = document.querySelector('.booking-section');
    if (bookingSection) {
        bookingSection.style.display = 'none'; // ซ่อนฟอร์ม
    }
}
