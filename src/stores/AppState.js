import { observable, action } from "mobx";
import Validator from 'validatorjs';
import { merge, findIndex } from 'lodash';

export default class AppState {

  constructor(){
    this.tableHeaders = ["ID", "Name", "Company name", "Phone"];
    this.initForm = {
      fields: {
        name: {
          value: '',
          error: null,
          rule: 'required'
        },
        company: {
          value: '',
          error: null,
          rule: 'required'
        },
        phone: {
          value: '',
          error: null,
          rule: 'required|numeric'
        }
      },
      meta: {
        isValid: false,
        error: null,
      },
    };
    this.users = [
      {
        id: 1,
        name: "Vasya",
        company: "Facebook",
        phone: "3809655433",
      },	{
        id: 2,
        name: "Petya",
        company: "Google",
        phone: "3809453345",
      },	{
        id: 3,
        name: "Lesha",
        company: "Linkedin",
        phone: "35345435",
      },	{
        id: 4,
        name: "Kolya",
        company: "Apple",
        phone: "456456456",
      },	{
        id: 5,
        name: "Zhenya",
        company: "Samsung",
        phone: "678678678",
      },	{
        id: 6,
        name: "Vova",
        company: "Microsoft",
        phone: "234234234",
      }
    ];
  }

  @observable
  filter = "";

  @observable
  filterUsers = () => {
    if (this.filter === "") {
      return this.users;
    }

    let users = [];
    this.users.map(user => {
      let trigger = false;
      for (let key in user) {
        if (`${user[key]}`.toLowerCase().indexOf(this.filter.toLowerCase()) > -1) {
          trigger = !trigger;
          break;
        }
      }

      if (trigger) {
        users.push(user)
      }
    });

    return users;
  };

  @observable
  form = merge({}, this.initForm);

  validationForm = (name, company, phone) => {
    return new Validator(
      { name: name.value, company: company.value, phone: phone.value },
      { name: name.rule, company: company.rule, phone: phone.rule },
    );
  };

  @action resetForm = () => {
    this.form = merge({}, this.initForm);
  };

  @action onFieldChange = (field, value) => {
    this.form.fields[field].value = value;
    let { name, company, phone } = this.form.fields;
    let validation = this.validationForm(name, company, phone);
    this.form.meta.isValid = validation.passes();
    this.form.fields[field].error = validation.errors.first(field)
  };

  @action addRow = (cb) => {
    let { name, company, phone } = this.form.fields;
    let validation = this.validationForm(name, company, phone);
    this.form.meta.isValid = validation.passes();
    if (this.form.meta.isValid) {
      this.users.push({
        id: this.users.length ? this.users[this.users.length - 1].id + 1 : 1,
        name: name.value,
        company: company.value,
        phone: phone.value
      });
      this.form = merge({}, this.initForm);
      cb();
    } else {
      const errorsData = validation.errors.errors;
      for (let key in errorsData) {
        this.form.fields[key].error = errorsData[key][0];
      }
    }
  };

  @action deleteRow = (id) => {
    this.users.splice(findIndex(this.users, {id}), 1);
  };

  @action onFilterChange = (e) => {
    this.filter = e.target.value;
  };
}
