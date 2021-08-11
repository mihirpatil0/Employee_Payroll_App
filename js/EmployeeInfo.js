class EmployeeInfo
{
    constructor(...params)
    {
        this.name = params[0];
        this.picture = params[1];
        this.gender = params[2];
        this.department = params[3];
        this.salary = params[4];
        this.startDate = params[5];
        this.notes = params[6];
    }

    get name()
    {
        return this._name;
    }

    set name(name)
    {
        let nameRegex = /[A-Z][A-Za-z]{2,}/;
        if (nameRegex.test(name))
            this._name = name;
        else
            throw "Invalid name";
    }

    get picture()
    {
        return this._picture;
    }
    set picture(picture)
    {
        this._picture = picture;
    }

    get gender()
    {
        return this._gender;
    }

    set gender(gender)
    {
        this._gender = gender;
    }

    get department()
    {
        return this._department;
    }

    set department(department)
    {
        this._department = department;
    }

    get salary()
    {
        return this._salary;
    }

    set salary(salary)
    {
        this._salary = salary;
    }

    get startDate()
    {
        return this._startDate;
    }

    set startDate(startDate)
    {
        startDate = startDate.getTime() + (30 * 24 * 60 * 60 * 1000);
        let today = new Date().getTime() + (30 * 24 * 60 * 60 * 1000);
        if (today >= startDate)
        {
            this._startDate = startDate;
        }
        else
        {
            throw "Invalid date"
        }
    }

    get notes()
    {
        return this._notes;
    }
      
    set notes(notes)
    {
        this._notes = notes;
    }

    toString ()
    {
        return `name = ${this.name} profileImage = ${this.picture}  gender ${this.gender} department = ${this.department} salary = ${this.salary} startDate =  ${this.startDate} notes = ${this.notes} `;
    }
}