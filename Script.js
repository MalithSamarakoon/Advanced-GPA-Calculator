
const newSyllabus = {
    "Year 1": {
        "Semester 1": [
            {name: "IP", credits: 4, grade: "A+"},
            {name: "DCN", credits: 4, grade: "A+"},
            {name: "MC", credits: 4, grade: "A+"},
            {name: "FC", credits: 4, grade: "A+"},
        ],
        "Semester 2": [
            {name: "DM", credits: 4, grade: "A+"},
            {name: "DSA", credits: 4, grade: "A+"},
            {name: "SE", credits: 4, grade: "A+"},
            {name: "TW", credits: 4, grade: "A+"},
        ]
    },

    "Year 2": {
        "Semester 1": [
            {name: "PAS", credits: 4, grade: "A+"},
            {name: "OOP", credits: 4, grade: "A+"},
            {name: "OSSA", credits: 4, grade: "A+"},
            {name: "DD & D", credits: 4, grade: "A+"},
        ],
        "Semester 2": [
            {name: "AI & ML", credits: 4, grade: "A+"},
            {name: "ITP", credits: 4, grade: "A+"},
            {name: "W & MT", credits: 4, grade: "A+"},
            {name: "PS", credits: 4, grade: "A+"},
        ]
    }

}


const oldSyllabus = {
    "Year 1": {
        "Semester 1": [
            {name: "IP", credits: 4, grade: "A+"},
            {name: "ICS", credits: 4, grade: "A+"},
            {name: "MC", credits: 4, grade: "A+"},
            {name: "CS", credits: 3, grade: "A+"},
        ],
        "Semester 2": [
            {name: "OOC", credits: 2, grade: "A+"},
            {name: "SPM", credits: 3, grade: "A+"},
            {name: "EAP", credits: 3, grade: "A+"},
            {name: "ISDM", credits: 4, grade: "A+"},
            {name: "IWT", credits: 4, grade: "A+"}
        ]
    },

    "Year 2": {
        "Semester 1": [
            {name: "SE", credits: 4, grade: "A+"},
            {name: "OOP", credits: 4, grade: "A+"},
            {name: "DMS", credits: 4, grade: "A+"},
            {name: "CN", credits: 4, grade: "A+"},
            {name: "OSSA", credits: 4, grade: "A+"}
            
        ],
        "Semester 2": [
            {name: "MAD", credits: 4, grade: "A+"},
            {name: "DSA", credits: 4, grade: "A+"},
            {name: "ITP", credits: 4, grade: "A+"},
            {name: "PS", credits: 2, grade: "A+"},
            {name: "PAS", credits: 3, grade: "A+"}
            
            
        ]
    }

}


let currentSyllabus = null;
let activeSyllabusData = null;


function addModule() {
    const tbody = document.getElementById("moduleBody");
    const row = document.createElement("tr");

    row.innerHTML = `
                <td><input type="text" placeholder="Enter module name"></td>
                <td><input type="number" placeholder="Enter credits" min="0"></td>
                <td>
                    <select>
                        <option value="">Select Grade</option>
                        <option value="4.0">A+ (4.0)</option>
                        <option value="4.0">A (4.0)</option>
                        <option value="3.7">A- (3.7)</option>
                        <option value="3.3">B+ (3.3)</option>
                        <option value="3.0">B (3.0)</option>
                        <option value="2.7">B- (2.7)</option>
                        <option value="2.3">C+ (2.3)</option>
                        <option value="2.0">C (2.0)</option>
                        <option value="1.7">C- (1.7)</option>
                        <option value="1.3">D+ (1.3)</option>
                        <option value="1.0">D (1.0)</option>
                        <option value="0.0">E (0.0)</option>
                    </select>
                </td>
            `;

            tbody.appendChild(row);
}



function handleSyllabusClick(event){
    const syllabusType = event.target.dataset.syllabus;
    
    
    currentSyllabus = syllabusType;
    activeSyllabusData = (syllabusType === "new") ? newSyllabus : oldSyllabus;
    
    
    document.getElementById("syllabusSelector").style.display = "none";
    
    
    renderSemesterButtons(syllabusType);
}



function renderSemesterButtons(syllabusType){
    const container = document.getElementById("semesterButtonsContainer");
    container.innerHTML = "";

    if(syllabusType === "new"){
        const buttonConfigs = [
            {label: "Only Year 1 Semester 1", type: "single", year: 1, semester: 1 },
            {label: "Upto Year 1 Semester 2", type: "cumulative", year: 1, semester: 2 },
            {label: "Upto Year 2 Semester 1", type: "cumulative", year: 2, semester: 1 },
            {label: "Upto Year 2 Semester 2", type: "cumulative", year: 2, semester: 2 },
            {label: "Custom", type: "custom" }
        ];

        buttonConfigs.forEach(config => {
            const button = document.createElement("button");
            button.textContent = config.label;
            button.dataset.type = config.type;
            if (config.year) button.dataset.year = config.year;
            if (config.semester) button.dataset.semester = config.semester;
            button.addEventListener("click", handleSemesterButtonClick);
            container.appendChild(button);
        });

    }else{

        const buttonConfigs = [
            {label: "Only Year 2 Semester 2 ", type: "single", year: 2, semester: 2 },
            {label: "Upto Year 2 Semester 2", type: "cumulative", year: 2, semester: 2 },
            {label: "Custom", type: "custom" }
        ];

        buttonConfigs.forEach(config => {
            const button = document.createElement("button");
            button.textContent = config.label;
            button.dataset.type = config.type;
            if (config.year) button.dataset.year = config.year;
            if (config.semester) button.dataset.semester = config.semester;
            button.addEventListener("click", handleSemesterButtonClick);
            container.appendChild(button);
        });
    }

    
    container.style.display = "block";  //display the semester buttons container
}

function handleSemesterButtonClick(event){
    const buttonType = event.target.dataset.type;
    const year = parseInt(event.target.dataset.year);
    const semester = parseInt(event.target.dataset.semester);

    let modules = [];

    if(buttonType === "custom"){
        const tbody = document.getElementById("moduleBody");
        tbody.innerHTML = "";
        addModule();
    }else if(buttonType === "single"){
        modules = activeSyllabusData[`Year ${year}`][`Semester ${semester}`];
        loadModules(modules);
    }else if(buttonType === "cumulative"){
        modules = getCumulativeModules(year, semester);
        loadModules(modules);
    }

    
    document.getElementById("calculatorSection").style.display = "block";   //display the calculator section
}


function getCumulativeModules(upToYear, upToSemester) {
    let allModules = [];
    
    for (let y = 1; y <= upToYear; y++) {
        const maxSem = (y < upToYear) ? 2 : upToSemester;
        
        for (let s = 1; s <= maxSem; s++) {
            const semesterModules = activeSyllabusData[`Year ${y}`][`Semester ${s}`];
            if (semesterModules) {
                allModules = allModules.concat(semesterModules);
            }
        }
    }
    
    return allModules;
}


function loadModules(modules) {
    const tbody = document.getElementById("moduleBody");
    
    
    tbody.innerHTML = "";
    
    
    modules.forEach(module => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><input type="text" value="${module.name}"></td>
            <td><input type="number" value="${module.credits}" min="0"></td>
            <td>
                <select>
                    <option value="">Select Grade</option>
                    <option value="4.0">A+ (4.0)</option>
                    <option value="4.0">A (4.0)</option>
                    <option value="3.7">A- (3.7)</option>
                    <option value="3.3">B+ (3.3)</option>
                    <option value="3.0">B (3.0)</option>
                    <option value="2.7">B- (2.7)</option>
                    <option value="2.3">C+ (2.3)</option>
                    <option value="2.0">C (2.0)</option>
                    <option value="1.7">C- (1.7)</option>
                    <option value="1.3">D+ (1.3)</option>
                    <option value="1.0">D (1.0)</option>
                    <option value="0.0">E (0.0)</option>
                </select>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function calculateGPA() {

    totalWeigtedPoints = 0;
    totalCreditPoints = 0;

    const tbody = document.getElementById("moduleBody");
    const rows = tbody.querySelectorAll("tr");

    for(let row of rows){
        const creditInput = row.cells[1].querySelector('input[type="number"]');
        const gradeSelect = row.cells[2].querySelector('select');

        const credits = parseFloat(creditInput.value);
        const grade = parseFloat(gradeSelect.value);

        if(!isNaN(credits) && !isNaN(grade)){
            totalWeigtedPoints += credits * grade;
            totalCreditPoints += credits;
        }
    }

    const gpa = totalWeigtedPoints / totalCreditPoints;

    const gpaResultField = document.getElementById("gpaResult");
    if(!isNaN(gpa)){
        gpaResultField.textContent = `Cumulative GPA: ${gpa.toFixed(2)}`;
    } else {
        gpaResultField.textContent = `Cumulative GPA: 0.00`;
    }

}


function init(){
    const tbody = document.getElementById("moduleBody");
    tbody.addEventListener("input", calculateGPA);
    tbody.addEventListener("change", calculateGPA);

    
    const syllabusButtons = document.querySelectorAll('[data-syllabus]');
    syllabusButtons.forEach(button => {
        button.addEventListener("click", handleSyllabusClick);
    });
}


window.addEventListener("DOMContentLoaded", init);