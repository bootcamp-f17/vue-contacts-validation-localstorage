var contactApp = new Vue({

  el: "#contactApp",

  data: {

    newName: '',
    newPhone: '',
    newEmail: '',

    contactList: [], // this is used to store data

    nextId: 5,

    contactSeeds: [
      {
        id: 1,
        name: 'Albus Dumbledore',
        phone: '859-123-4567',
        email: 'call.me.al@hogwarts.com'
      },
      {
        id: 2,
        name: 'Minerva McGonagall',
        phone: '606-234-9876',
        email: 'mmcgona@hogwarts.com'
      },
      {
        id: 3,
        name: 'Severus Snape',
        phone: '502-444-1010',
        email: 'potionsmstr@hogwarts.com'
      },
      {
        id: 4,
        name: 'Rubeus Hagrid',
        phone: '859-913-2846',
        email: 'norbertsmommy@hogwarts.com'
      }
    ]

  },

  computed: {

    contacts: function() { // this is the sorted version of contactList, for display purposes

      return this.contactList.sort(this.alphabetizeContacts);

    }

  },

  beforeMount: function() {

    this.loadContacts();    

  },

  methods: {

    addContact: function() {

      this.contactList.push({
        id: this.nextId++,
        name: this.newName,
        phone: this.newPhone,
        email: this.newEmail
      });
      this.newName = '';
      this.newPhone = '';
      this.newEmail = '';
      this.nextId++;

      this.saveContacts();

    },
    
    removeContact: function(id) {

      var index = this.findContact(id);
      this.contactList.splice(index, 1);
      this.saveContacts();

    },
    
    findContact: function(id) {

      return this.contactList.findIndex(function(contact) {
        return id === contact.id;
      });


    },

    loadContacts: function() {

      this.contactList = JSON.parse(localStorage.getItem('contactList'));
      if (this.contactList) {
        this.nextId = this.contactList.length + 1;
      }
      else {
        this.contactList = this.contactSeeds;
        this.nextId = this.contactList.length + 1;
      }

    },

    saveContacts: function() {

      console.log("Saving contacts...");
      localStorage.setItem('contactList', JSON.stringify(this.contactList));

    },

    alphabetizeContacts: function(a, b) {

      var aName = a.name.toLowerCase();
      var bName = b.name.toLowerCase();

      var comparison = 0;

      if (aName > bName) {
        comparison = 1;
      }
      else if (aName < bName) {
        comparison = -1;
      }

      return comparison;

    }

  }

});