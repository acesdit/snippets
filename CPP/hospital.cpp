#include <iostream>
#include <string>
#include <vector>

using namespace std;

class Hospital {
    string p_name, problem, address;
    int age, dd, mm, yy;
    long int number;

public:
    void appoint();
    void displayDoctorList() const;
    void processPayment() const;
};

class Doctor : public Hospital {
public:
    void scheduleAppointment(int doctorId);
};

void Doctor::scheduleAppointment(int doctorId) {
    appoint();
    cout << "\n\t\t\tThank you! We will call you after some time!" << "\n";
}

void Hospital::appoint() {
    cout << "\n\t\t\tPlease enter patient's name: ";
    getline(cin, p_name);

    cout << "\n\t\t\tPlease enter patient age: ";
    cin >> age;
    

    cout << "\n\t\t\tPlease enter patient's problem: ";
    getline(cin, problem);

    cout << "\n\t\t\tPlease enter patient's address: ";
    getline(cin, address);

    cout << "\n\t\t\tPlease enter appointment date (dd mm yy): ";
    cin >> dd >> mm >> yy;
    
    cout << "\n\t\t\tPlease enter patient phone number: ";
    cin >> number;
    
}

void Hospital::displayDoctorList() const {
    cout << "\n\t\t\tAvailable Doctors:\n";
    cout << "\t1. Dr. Pooja - Brain Specialist\n";
    cout << "\t2. Dr. Shrinivas - Skin Specialist\n";
    cout << "\t3. Dr. Sachin Ghuge - Eye Specialist\n";
    cout << "\t4. Dr. Manisha Ghuge - Ear Specialist\n";
    cout << "\t5. Dr. Shruti - Psychologist\n";
    cout << "\t6. Dr. Vaishnavi - Diabetes Specialist\n";
    cout << "\t7. Dr. Meera - Kidney Stone Specialist\n";
}

void Hospital::processPayment() const {
    int amt;
    cout << "\n\t\t\tEnter patient bill amount: ";
    cin >> amt;

    cout << "\n\t\t\tPayment successful!\n";
    cout << "\n\t\t\t--------------------Data---------------------------";
    cout << "\n\t\t\tPatient Name: " << p_name << "\n";
    cout << "\n\t\t\tPatient Problem: " << problem << "\n";
    cout << "\n\t\t\tAmount Paid: " << amt << "\n";
    cout << "\n\t\t\tAppointment Date: " << dd << "/" << mm << "/" << yy << "\n";
    cout << "\n\t\t\tThank you for coming!" << "\n";
}

int main() {
    int choice;
    Doctor doctor;

    while (true) {
        cout << "\n\t\t\t=================== HOSPITAL MANAGEMENT SYSTEM ===================";
        cout << "\n\t\t\t--------------------------------------------------------------------";
        cout << "\n\t\t\t1. Seat Booking";
        cout << "\n\t\t\t2. Payment";
        cout << "\n\t\t\t3. List of Doctors";
        cout << "\n\t\t\t4. Exit";
        cout << "\n\t\t\tPlease select an option: ";
        cin >> choice;
       

        switch (choice) {
            case 1:
                cout << "\n\t\t\t--------- Seat Booking ---------";
                doctor.appoint();
                break;

            case 2:
                cout << "\n\t\t\t---------- Payment --------------";
                doctor.processPayment();
                break;

            case 3: {
                cout << "\n\t\t\t----------- List of Doctors ---------";
                doctor.displayDoctorList();
                int docChoice;
                cout << "\n\t\t\tSelect a doctor (1-7): ";
                cin >> docChoice;
                cin.ignore(); 
                if (docChoice >= 1 && docChoice <= 7) {
                    doctor.scheduleAppointment(docChoice);
                } else {
                    cout << "\n\t\t\tInvalid choice. Please select again.";
                }
                break;
            }

            case 4:
                cout << "\n\t\t\tExiting the system. Thank you!";
                return 0;

            default:
                cout << "\n\t\t\tInvalid option. Please try again.";
        }
    }
    return 0;
}
