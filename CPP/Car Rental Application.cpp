#include <iostream>
#include <string>
using namespace std;

class Vehicle {
protected:
    string make;
    string model;
    double rentalPrice;
    bool isBooked;
    bool isParked;

public:
    Vehicle() 
	{
		rentalPrice=0.0;
		isBooked=false;
		isParked=false;
	}
	

    virtual void setDetails(const string& m, const string& mo, double price) {
        make = m;
        model = mo;
        rentalPrice = price;
        isBooked = false; 
        isParked = false; 
    }

    virtual void displayInfo() const = 0;

    bool book() {
        if (isBooked) {
            cout << "Vehicle is already booked!" << endl;
            return false;
        }
        isBooked = true;
        return true;
    }

    bool cancelBooking() {
        if (!isBooked) {
            cout << "Vehicle is not booked!" << endl;
            return false;
        }
        isBooked = false;
        cout << "Booking canceled successfully." << endl;
        return true;
    }

    bool park() {
        if (!isBooked) {
            cout << "Vehicle must be booked before parking!" << endl;
            return false;
        }
        isParked = true;
        return true;
    }

    bool unpark() {
        if (!isParked) {
            cout << "Vehicle is not parked!" << endl;
            return false;
        }
        isParked = false;
        cout << "Vehicle unparked successfully." << endl;
        return true;
    }

    bool isAvailable() const {
        return !isBooked;
    }
};

class LargeVehicle : public Vehicle {
public:
    void displayInfo() const override {
        cout << "Large Vehicle: " << make << " " << model << endl;
        cout << "Rental Price: $" << rentalPrice << " per day" << endl;
        cout << "Status: " << (isBooked ? "Booked" : "Available") << ", "
             << (isParked ? "Parked" : "Not Parked") << endl;
    }
};

class MediumVehicle : public Vehicle {
public:
    void displayInfo() const override {
        cout << "Medium Vehicle: " << make << " " << model << endl;
        cout << "Rental Price: $" << rentalPrice << " per day" << endl;
        cout << "Status: " << (isBooked ? "Booked" : "Available") << ", "
             << (isParked ? "Parked" : "Not Parked") << endl;
    }
};

class SmallVehicle : public Vehicle {
public:
    void displayInfo() const override {
        cout << "Small Vehicle: " << make << " " << model << endl;
        cout << "Rental Price: $" << rentalPrice << " per day" << endl;
        cout << "Status: " << (isBooked ? "Booked" : "Available") << ", "
             << (isParked ? "Parked" : "Not Parked") << endl;
    }
};

int main() {
    Vehicle* vehicles[10]; 
    int vehicleCount = 0; 
    int choice;

    while (true) {
        cout << "\n1. Add Vehicle\n2. Display Available Vehicles\n3. Book Vehicle\n4. Cancel Booking\n5. Park Vehicle\n6. Unpark Vehicle\n7. Exit\n";
        cout << "Enter your choice: ";
        cin >> choice;

        if (choice == 7) {
            cout << "Exiting the system." << endl;
            break;
        }

        if (choice == 1) {
            int type;
            string make, model;
            double price;
            cout << "Select Vehicle Type (1: Large, 2: Medium, 3: Small): ";
            cin >> type;
            cout << "Enter Make, Model, and Rental Price: ";
            cin >> make >> model >> price;

            if (vehicleCount < 10) {
                Vehicle* vehicle = nullptr;
                if (type == 1) vehicle = new LargeVehicle();
                else if (type == 2) vehicle = new MediumVehicle();
                else if (type == 3) vehicle = new SmallVehicle();
                else {
                    cout << "Invalid vehicle type!" << endl;
                    continue;
                }
                vehicle->setDetails(make, model, price);
                vehicles[vehicleCount++] = vehicle;
                cout << "Vehicle added successfully." << endl;
            } else {
                cout << "Cannot add more vehicles. Maximum limit reached!" << endl;
            }
        } else if (choice == 2) {
            cout << "Available Vehicles:" << endl;
            for (int i = 0; i < vehicleCount; ++i) {
                if (vehicles[i]->isAvailable()) {
                    cout << i << ": ";
                    vehicles[i]->displayInfo();
                }
            }
        } else if (choice >= 3 && choice <= 6) {
            int index;
            string actions[] = {"book", "cancel booking", "park", "unpark"};
            cout << "Enter vehicle index to " << actions[choice - 3] << ": ";
            cin >> index;

            if (index >= 0 && index < vehicleCount) {
                switch (choice) {
                    case 3: vehicles[index]->book(); break;
                    case 4: vehicles[index]->cancelBooking(); break;
                    case 5: vehicles[index]->park(); break;
                    case 6: vehicles[index]->unpark(); break;
                }
            } else {
                cout << "Invalid vehicle index!" << endl;
            }
        } else {
            cout << "Invalid choice! Please try again." << endl;
        }
    }

    for (int i = 0; i < vehicleCount; ++i) {
        delete vehicles[i];
    }

    return 0;
}
