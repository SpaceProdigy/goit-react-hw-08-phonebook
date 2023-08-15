import BasicAccordion from 'components/BasicAccordion/BasicAccordion';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import Title from 'components/Title/Title';
import css from './Contacts.module.css';

const Contacts = () => {
  return (
    <section className={css.contact}>
      <Title text="PhoneBook_Pro" />
      <BasicAccordion
        name1={
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <AddCircleIcon style={{ color: 'green', fontSize: '35px' }} />
            <p>Add contact</p>
          </div>
        }
        name2={
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <PersonSearchIcon style={{ color: '#f59f32', fontSize: '35px' }} />
            <p>Find contacts by name</p>
          </div>
        }
        name3={
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <ContactPhoneIcon style={{ color: '#89b6ee', fontSize: '35px' }} />
            <p>Contacts</p>
          </div>
        }
        component1={<ContactForm />}
        component2={<Filter />}
        component3={<ContactList />}
      />
    </section>
  );
};

export default Contacts;
