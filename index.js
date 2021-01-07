let usersArray = []

const btn = document.querySelector('.btn-result')
const div = document.querySelector('.result')


class User {
    constructor(firstName, secondName, dateOfBirth, password, sex, email, access) {
        this.firstName = this.validName(firstName);
        this.secondName = this.validName(secondName);
        this.email = this.validEmail(email)
        this.gender = ['male', 'female']
        this.dateOfBirth = moment(dateOfBirth).format('DD/MM/YYYY')
        this.password = password
        this.access = access
        this.sex = this.showGender(sex)
    }
    changeEmail(newemail) {
        return this.email = newemail
    }


    showGender(number) {
        console.log(this.gender[1])
        if (number === 0) return this.gender[0]
        if (number === 1) return this.gender[1]
    }


    validName(newFirstName) {
        if (is.not.empty(newFirstName) && is.string(newFirstName)) {
            return newFirstName
        } else {
            return console.log('Error, First name and Second name required, Names need to be a string')
        }
    }


    validEmail(newEmail) {
        if (is.email(newEmail)) {
            return newEmail
        } else {
            return console.log('Error, email is not valid')
        }
    }


    validPassword(pass) {
        const regExp = /"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"/;
        if (pass.match(regExp)) {
            return pass
        } else {
            return console.log('password not valid ')
        }
    }


    set newPassword(newPassword) {
        this.password = newPassword;
    }

}

class Administrator extends User {
    constructor(firstName, secondName, dateOfBirth, password, sex, email, access = 'admin') {
        super(firstName, secondName, dateOfBirth, password, sex, email, access)
    }


    changeAccess(user, newAccess) {
        user.access = this.newAccess
    }

    changePassword(user, newPassword) {
        user.newPassword = this.newPassword
    }
}








// Form 

const submit = document.querySelector('input[type=submit]')

function showResult(arr) {
  
    
    
    let string = ''
    for (let i = 0; i < arr.length; i++) {
        string += `<ul class='list'>
        <h3>Case ${i + 1}</h3>
        <li class='item'>Name ${arr[i].firstName}</li>
          <li class='item'>Surname: ${arr[i].secondName}</li> 
          <li class='item'>Email: ${arr[i].email}</li> 
          <li class='item'>Date of Birth: ${arr[i].dateOfBirth}</li>
          <li class='item'>Gender: ${arr[i].sex}</li>
          <li class='item'>Password: ${arr[i].password}</li>
          <li class='item'>Level access: ${arr[i].access}</li>
          </ul>`
    }
    div.innerHTML = string
}


btn.addEventListener('click', () => showResult(usersArray))

function result(firstName, surName, dob, password, sex, email, access) {
    if (access === 'user') {
        const user = new User(firstName, surName, dob, password, sex, email, access)
        usersArray.push(user)
        return user

    } else if (access === 'admin') {
        const admin = new Administrator(firstName, surName, dob, password, sex, email, access)
        usersArray.push(admin)
        return admin
    }
}


submit.addEventListener('click', (e) => {
    e.preventDefault()

    const firstName = document.querySelector('#name').value
    const surName = document.querySelector('#surname').value
    const dob = document.querySelector('#dob').value
    let sex;
    if (document.querySelector('#male').checked) {
        sex = 0
    }
    if (document.querySelector('#female').checked) {
        sex = 1
    }
    const email = document.querySelector('#email').value
    const password = document.querySelector('#pass').value
    let access
    if (document.querySelector('#user').checked) {
        access = 'user'
    }
    if (document.querySelector('#admin').checked) {
        access = 'admin'
    }
    if (!document.querySelector('#user').checked && !document.querySelector('#admin').checked){
        if(document.querySelector('p') == undefined){

            const createEl = document.createElement('p');
            createEl.textContent = 'Access level is required to choose.'
            const label = document.querySelector('#admin').nextElementSibling
            document.forms[0].insertBefore(createEl, label)
            console.log(createEl, label)
            console.log(typeof p)
        } else if(document.querySelector('#user').checked || document.querySelector('#admin').checked){
            document.querySelector('p').remove()
        }
    }
    document.forms[0].reset()

    return result(firstName, surName, dob, password, sex, email, access)
})