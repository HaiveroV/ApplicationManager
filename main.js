// Application Class
class Application {
    constructor(name, email, age, phoneNumber, commType, engLvl,
        startDate, techSkills, persInfo, remoteStudy) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.phoneNumber = phoneNumber;
        this.commType = commType;
        this.engLvl = engLvl;
        this.startDate = startDate;
        this.techSkills = techSkills;
        this.persInfo = persInfo;
        this.remoteStudy = remoteStudy;
    }
}

//UI Class: Handle UI Tasks
class UI {
    static displayApplications() {

        const applications = Store.getApplications();
        applications.forEach((application) => UI.addApplicationToList(application));
    }

    static addApplicationToList(application) {
        const list = document.querySelector('#app-list');

        const row = document.createElement('tr');

        row.innerHTML = `
    <td>${application.name}</td>
    <td>${application.email}</td>
    <td>${application.age}</td>
    <td>${application.phoneNumber}</td>
    <td>${application.commType}</td>
    <td>${application.engLvl}</td>
    <td>${application.startDate}</td>
    <td>${application.techSkills}</td>
    <td>${application.persInfo}</td>
    <td>${application.remoteStudy}</td>
    <td>
    <a href="#" class="btn btn-danger btn-sm delete">
    X</a>
    </td>
    `;

        list.appendChild(row);
    }

    static deleteApp(element) {
        if (element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
        }

    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const jumbotron = document.querySelector('.jumbotron');
        const myForm = document.querySelector('#myForm');
        jumbotron.insertBefore(div, myForm);

        setTimeout(() =>
            document.querySelector('.alert').remove(),
            3000);
    }

    static clearFields() {
        document.querySelector('#name').value = ''
        document.querySelector('#email').value = ''
        document.querySelector('#age').value = ''
        document.querySelector('#phoneNumber').value = ''
        document.querySelector('input[name="optradio"]:checked').value = false;
        document.querySelector('#engLevel').value = ''
        document.querySelector('#startDate').value = ''
        document.querySelector('#skillsAndCourses').value = ''
        document.querySelector('#persPresent').value = ''
        document.querySelector('#remoteStudy').value = ''
    }

}

class Store {

    static getApplications() {
        let applications;
        if (localStorage.getItem('applications') === null) {
            applications = [];
        } else {
            applications = JSON.parse(localStorage.getItem('applications'));
        }
        return applications;
    }

    static addApplication(application) {
        const applications = Store.getApplications();

        applications.push(application);

        localStorage.setItem('applications', JSON.stringify(applications));
    }

    static removeApplication(email) {
        const applications = Store.getApplications();

        applications.forEach((application, index) => {
            if (application.email === email) {
                applications.splice(index, 1);
            }
        });

        localStorage.setItem('applications', JSON.stringify(applications));
    }
}

document.addEventListener('DOMContentLoaded', UI.displayApplications)

document.querySelector('#myForm').addEventListener('submit', (e) => {

    e.preventDefault();

    // Get form values

    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const age = document.querySelector('#age').value;
    const phoneNumber = document.querySelector('#phoneNumber').value;
    const commType = document.querySelector('input[name="optradio"]:checked').value;
    const engLvl = document.querySelector("#engLevel").value;
    const startDate = document.querySelector("#startDate").value;
    const techSkills = document.querySelector("#skillsAndCourses").value;
    const persInfo = document.querySelector("#persPresent").value;
    var remoteStudy;

    if (document.querySelector("#remoteStudy").checked) {
        remoteStudy = 'Yes';
    } else {
        remoteStudy = 'No';
    }

    // Validation

    if (name === '' || email === '') {
        UI.showAlert('Please fill in all forms', 'danger');
    } else {
        const application = new Application(name, email, age, phoneNumber, commType,
            engLvl, startDate, techSkills, persInfo, remoteStudy);

        // Add App to UI
        UI.addApplicationToList(application);

        Store.addApplication(application);

        UI.showAlert('Application Added', 'success');

        // Reset form
        UI.clearFields();
    }

});


// Remove Application

document.querySelector('#app-list').addEventListener('click', (e) => {
    UI.deleteApp(e.target);

    Store.removeApplication(e.target.parentElement.previousElementSibling.textContent);

    UI.showAlert('Application Added', 'success');
});



