const form = document.getElementById('registrationForm');
const userList = document.getElementById('userList');
let editMode = false;
let editIndex = -1;

// Function to handle form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const skills = document.getElementById('skills').value;
    const gender = document.getElementById('gender').value;
    const phone = document.getElementById('phone').value;
    const website = document.getElementById('website').value;

    // Validate that the phone number contains only digits
    if (!/^\d+$/.test(phone)) {
        alert('Phone number must contain only digits.');
        return;
    }

    if (editMode) {
        updateUser(editIndex, name, email, skills, gender, phone, website);
    } else {
        addUser(name, email, skills, gender, phone, website);
    }

    form.reset();
});

// Function to add a new user
function addUser(name, email, skills, gender, phone, website) {
    const li = document.createElement('li');
    li.className = 'user-item';
    li.innerHTML = `
        <span><strong>Name:</strong> ${name} <br>
               <strong>Email:</strong> ${email} <br>
               <strong>Skills:</strong> ${skills} <br>
               <strong>Gender:</strong> ${gender} <br>
               <strong>Phone:</strong> ${phone} <br>
               <strong>Website:</strong> <a href="${website}" target="_blank">${website}</a></span>
        <div class="actions">
            <button class="editBtn" onclick="editUser(${userList.children.length})">Edit</button>
            <button class="deleteBtn" onclick="deleteUser(${userList.children.length})">Delete</button>
        </div>
    `;
    userList.appendChild(li);
}

// Function to edit a user
function editUser(index) {
    const userItem = userList.children[index];
    const userData = userItem.querySelector('span').innerText.split('\n');
    const name = userData[0].split(':')[1].trim();
    const email = userData[1].split(':')[1].trim();
    const skills = userData[2].split(':')[1].trim();
    const gender = userData[3].split(':')[1].trim();
    const phone = userData[4].split(':')[1].trim();
    const website = userData[5].split(':')[1].trim();

    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('skills').value = skills;
    document.getElementById('gender').value = gender;
    document.getElementById('phone').value = phone;
    document.getElementById('website').value = website;

    editMode = true;
    editIndex = index;
}

// Function to update a user
function updateUser(index, name, email, skills, gender, phone, website) {
    const userItem = userList.children[index];
    userItem.querySelector('span').innerHTML = `
        <strong>Name:</strong> ${name} <br>
        <strong>Email:</strong> ${email} <br>
        <strong>Skills:</strong> ${skills} <br>
        <strong>Gender:</strong> ${gender} <br>
        <strong>Phone:</strong> ${phone} <br>
        <strong>Website:</strong> <a href="${website}" target="_blank">${website}</a>
    `;
    userItem.querySelector('.editBtn').setAttribute('onclick', `editUser(${index})`);
    userItem.querySelector('.deleteBtn').setAttribute('onclick', `deleteUser(${index})`);

    editMode = false;
    editIndex = -1;
}

// Function to delete a user
function deleteUser(index) {
    userList.children[index].remove();
    // Update the onclick attributes of remaining items
    Array.from(userList.children).forEach((userItem, idx) => {
        userItem.querySelector('.editBtn').setAttribute('onclick', `editUser(${idx})`);
        userItem.querySelector('.deleteBtn').setAttribute('onclick', `deleteUser(${idx})`);
    });
}
