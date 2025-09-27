const inputs = document.querySelectorAll('.input input');
inputs.forEach(input => {
  if (input.value.trim() !== '') input.classList.add('filled');
  input.addEventListener('input', () => {
    if (input.value.trim() !== '') input.classList.add('filled');
    else input.classList.remove('filled');
  });
});

const form = document.getElementById('registrationForm');
if(form){
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const fname = document.getElementById('fname').value.trim();
    const lname = document.getElementById('lname').value.trim();
    const email = document.getElementById('email').value.trim();

    if(fname === "" || lname === "" || email === ""){
      alert("Please fill all fields.");
      return;
    }

    const registrations = JSON.parse(localStorage.getItem('registrations') || "[]");
    registrations.push({fname, lname, email});
    localStorage.setItem('registrations', JSON.stringify(registrations));

    window.location.href = "success.html";
  });
}

const tableBody = document.querySelector("#registrationsTable tbody");
if(tableBody){
  const registrations = JSON.parse(localStorage.getItem('registrations') || "[]");
  registrations.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${r.fname}</td><td>${r.lname}</td><td>${r.email}</td>`;
    tableBody.appendChild(tr);
  });
}
