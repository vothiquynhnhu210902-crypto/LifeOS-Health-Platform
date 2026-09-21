
// DỮ LIỆU BỆNH NHÂN
// ========================================

let patients = JSON.parse(localStorage.getItem("lifeosPatients")) || [];

const defaultPatients = [
    {
        code: "BN001",
        name: "Nguyễn Văn An",
        age: 45,
        phone: "0901234567",
        visitDate: "05/09/2026",
        followDate: "19/09/2026",
        bloodPressure: "140/90",
        heartRate: 88,
        temperature: 36.8,
        note: "Tái khám định kỳ sau điều trị"
    },

    {
        code: "BN002",
        name: "Trần Thị Lan",
        age: 32,
        phone: "0987654321",
        visitDate: "22/09/2026",
        followDate: "15/10/2026",
        bloodPressure: "120/80",
        heartRate: 75,
        temperature: 36.7,
        note: "Tái khám định kỳ"
    },

    {
        code: "BN003",
        name: "Lê Văn Minh",
        age: 50,
        phone: "0912345678",
        visitDate: "23/09/2026",
        followDate: "20/10/2026",
        bloodPressure: "120/80",
        heartRate: 80,
        temperature: 37.1,
        note: "Theo dõi sức khỏe định kỳ"
    }
];

// Nếu chưa có dữ liệu thì dùng 3 bệnh nhân mẫu
if (!Array.isArray(patients) || patients.length === 0) {
    patients = defaultPatients;
}

// Bổ sung BN001, BN002, BN003 nếu chưa có
defaultPatients.forEach(defaultPatient => {
    const exists = patients.some(
        patient => patient.code === defaultPatient.code
    );

    if (!exists) {
        patients.push(defaultPatient);
    }
});

// Lưu dữ liệu
localStorage.setItem(
    "lifeosPatients",
    JSON.stringify(patients)
);

// ========================================
// TRA CỨU BỆNH NHÂN
// ========================================

function searchPatient() {

    const code =
        document
        .getElementById("patientCode")
        .value
        .trim()
        .toUpperCase();


    const patient =
        patients.find(
            p => p.code === code
        );


    if (!patient) {

        alert(
            "Không tìm thấy bệnh nhân " + code
        );

        return;
    }


    showPatient(patient);
  document.getElementById("dashboardBloodPressure").textContent = patient.bloodPressure || "--";
document.getElementById("dashboardHeartRate").textContent = patient.heartRate || "--";
document.getElementById("dashboardTemperature").textContent = patient.temperature || "--";  
}


// ========================================
// HIỂN THỊ HỒ SƠ BỆNH NHÂN
// ========================================

function showPatient(patient) {

    const patientSection =
        document.getElementById(
            "patientSection"
        );


    const patientInfo =
        document.getElementById(
            "patientInfo"
        );


    patientSection.classList.remove(
        "hidden"
    );


    patientInfo.innerHTML = `

        <div class="patient-info">

            <div class="info-item">
                <span>Mã bệnh nhân</span>
                <strong>
                    ${patient.code}
                </strong>
            </div>


            <div class="info-item">
                <span>Họ và tên</span>
                <strong>
                    ${patient.name}
                </strong>
            </div>


            <div class="info-item">
                <span>Tuổi</span>
                <strong>
                    ${patient.age} tuổi
                </strong>
            </div>


            <div class="info-item">
                <span>Số điện thoại</span>
                <strong>
                    ${patient.phone}
                </strong>
            </div>


            <div class="info-item">
                <span>Ngày khám</span>
                <strong>
                    ${patient.visitDate}
                </strong>
            </div>


            <div class="info-item">
                <span>Ngày tái khám</span>
                <strong>
                    ${patient.followDate}
                </strong>
            </div>


            <div class="info-item">
                <span>Huyết áp</span>
                <strong>
                    ${patient.bloodPressure}
                </strong>
            </div>


            <div class="info-item">
                <span>Nhịp tim</span>
                <strong>
                    ${patient.heartRate} bpm
                </strong>
            </div>


            <div class="info-item">
                <span>Nhiệt độ</span>
                <strong>
                    ${patient.temperature} °C
                </strong>
            </div>


            <div class="info-item">
                <span>Ghi chú</span>
                <strong>
                    ${patient.note}
                </strong>
            </div>

        </div>

    `;
}


// ========================================
// 🤖 AI PHÂN TÍCH HỒ SƠ
// ========================================

function analyzePatient() {

    const code =
        document
        .getElementById("patientCode")
        .value
        .trim()
        .toUpperCase();


    const patient =
        patients.find(
            p => p.code === code
        );


    if (!patient) {

        alert(
            "Vui lòng tra cứu bệnh nhân trước."
        );

        return;
    }


    const aiSection =
        document.getElementById(
            "aiSection"
        );


    const aiResult =
        document.getElementById(
            "aiResult"
        );


    aiSection.classList.remove(
        "hidden"
    );


    // ==============================
    // TÓM TẮT
    // ==============================

    let summary = `

        Bệnh nhân
        <b>${patient.name}</b>,
        ${patient.age} tuổi.

        Ngày khám gần nhất:
        <b>${patient.visitDate}</b>.

        Ngày tái khám:
        <b>${patient.followDate}</b>.

    `;


    // ==============================
    // HUYẾT ÁP
    // ==============================

    let bp =
        patient.bloodPressure
        .split("/");


    let systolic =
        Number(bp[0]);


    let diastolic =
        Number(bp[1]);


    let bpResult;


    if (
        systolic >= 140 ||
        diastolic >= 90
    ) {

        bpResult = `

            <div class="warning">

                ⚠️
                <b>Huyết áp cần được theo dõi</b>

                <br><br>

                Giá trị:
                <b>
                    ${patient.bloodPressure}
                </b>

            </div>

        `;

    } else {

        bpResult = `

            <div class="success">

                ✓ Huyết áp chưa vượt
                ngưỡng cảnh báo được
                thiết lập.

                <br>

                Giá trị:
                <b>
                    ${patient.bloodPressure}
                </b>

            </div>

        `;
    }


    // ==============================
    // NHỊP TIM
    // ==============================

    let heartResult;


    if (patient.heartRate > 100) {

        heartResult = `

            <div class="warning">

                ⚠️
                <b>Nhịp tim cần theo dõi</b>

                <br><br>

                Nhịp tim:
                <b>
                    ${patient.heartRate} bpm
                </b>

            </div>

        `;

    } else {

        heartResult = `

            <div class="success">

                ✓ Nhịp tim:
                <b>
                    ${patient.heartRate} bpm
                </b>

            </div>

        `;
    }


    // ==============================
    // TẠO KẾT QUẢ AI
    // ==============================

    aiResult.innerHTML = `

        <div class="ai-box">

            <h3>
                🤖 AI Health Assistant
            </h3>


            <h4>
                📋 Tóm tắt hồ sơ
            </h4>

            <p>
                ${summary}
            </p>


            <h4>
                ❤️ Phân tích huyết áp
            </h4>

            ${bpResult}


            <h4>
                💓 Phân tích nhịp tim
            </h4>

            ${heartResult}


            <h4>
                📅 Theo dõi tái khám
            </h4>

            <p>

                Ngày tái khám:
                <b>
                    ${patient.followDate}
                </b>

            </p>


            <h4>
                💡 Gợi ý theo dõi
            </h4>

            <p>

                Tiếp tục cập nhật dữ liệu
                sức khỏe và theo dõi lịch
                tái khám của bệnh nhân.

            </p>


            <hr>


            <small>

                ⚠️ Đây là công cụ hỗ trợ
                phân tích dữ liệu, không thay thế
                đánh giá chuyên môn của nhân viên
                y tế.

            </small>

        </div>

    `;
}
// ========================================
// THÊM BỆNH NHÂN MỚI
// ========================================

function addPatient() {

    const code = document
        .getElementById("newCode")
        .value
        .trim()
        .toUpperCase();

    const name = document
        .getElementById("newName")
        .value
        .trim();

    const age = document
        .getElementById("newAge")
        .value;

    const phone = document
        .getElementById("newPhone")
        .value
        .trim();

    const visitDate = document
        .getElementById("newVisitDate")
        .value
        .trim();

    const followDate = document
        .getElementById("newFollowDate")
        .value
        .trim();

    const bloodPressure = document
        .getElementById("newBloodPressure")
        .value
        .trim();

    const heartRate = document
        .getElementById("newHeartRate")
        .value;

    const temperature = document
        .getElementById("newTemperature")
        .value;

    const note = document
        .getElementById("newNote")
        .value
        .trim();


    // Kiểm tra mã và tên
    if (!code || !name) {

        alert("Vui lòng nhập mã bệnh nhân và họ tên.");

        return;
    }


    // Kiểm tra mã bệnh nhân đã tồn tại
    const existingPatient = patients.find(
        p => p.code === code
    );

    if (existingPatient) {

        alert("Mã bệnh nhân này đã tồn tại.");

        return;
    }


    // Tạo bệnh nhân mới
    const newPatient = {

        code: code,

        name: name,

        age: Number(age),

        phone: phone,

        visitDate: visitDate,

        followDate: followDate,

        bloodPressure: bloodPressure,

        heartRate: Number(heartRate),

        temperature: Number(temperature),

        note: note
    };


    // Thêm bệnh nhân vào danh sách
    patients.push(newPatient);localStorage.setItem("lifeosPatients", JSON.stringify(patients));


    // Thông báo
    alert(
        "Đã thêm bệnh nhân " + code
    );


    // Xóa form
    document.getElementById("newCode").value = "";
    document.getElementById("newName").value = "";
    document.getElementById("newAge").value = "";
    document.getElementById("newPhone").value = "";
    document.getElementById("newVisitDate").value = "";
    document.getElementById("newFollowDate").value = "";
    document.getElementById("newBloodPressure").value = "";
    document.getElementById("newHeartRate").value = "";
    document.getElementById("newTemperature").value = "";
    document.getElementById("newNote").value = "";
}
// =========================
// CẬP NHẬT DASHBOARD
// =========================

function updateDashboard() {

    // Tổng số bệnh nhân
    const totalPatients = patients.length;

    document.getElementById("totalPatients").textContent = totalPatients;


    // Đếm số bệnh nhân có ngày tái khám
    const upcomingVisits = patients.filter(patient => {
        return patient.followDate && patient.followDate.trim() !== "";
    }).length;

    document.getElementById("upcomingVisits").textContent = upcomingVisits;


    // Số hồ sơ có dữ liệu sức khỏe
    const healthRecords = patients.filter(patient => {
        return patient.bloodPressure ||
               patient.heartRate ||
               patient.temperature;
    }).length;

    document.getElementById("healthRecords").textContent = healthRecords;
}


// Cập nhật Dashboard khi mở website
document.addEventListener("DOMContentLoaded", function () {
    updateDashboard();
});
