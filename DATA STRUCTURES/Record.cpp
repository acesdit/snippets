#include <iostream>
#include <vector>
#include <algorithm>
#include <string>

using namespace std;

struct Record {
    string name;
    string dob;
    string phone;

    bool operator<(const Record& other) const {
        return name < other.name;
    }
};

void displayRecords(const vector<Record>& records) {
    for (const auto& record : records) {
        cout << "Name: " << record.name 
             << ", DOB: " << record.dob 
             << ", Phone: " << record.phone << endl;
    }
}

int searchRecord(const vector<Record>& records, const string& name) {
    auto it = find_if(records.begin(), records.end(), [&name](const Record& record) {
        return record.name == name;
    });
    if (it != records.end()) {
        return distance(records.begin(), it);
    }
    return -1;
}

int main() {
    vector<Record> records;
    int n;

    cout << "Enter number of records: ";
    cin >> n;
    cin.ignore();

    for (int i = 0; i < n; ++i) {
        Record record;
        cout << "Enter name: ";
        getline(cin, record.name);
        cout << "Enter DOB (YYYY-MM-DD): ";
        getline(cin, record.dob);
        cout << "Enter phone number: ";
        getline(cin, record.phone);
        records.push_back(record);
    }

    sort(records.begin(), records.end());

    cout << "\nSorted Records:\n";
    displayRecords(records);

    string searchName;
    cout << "\nEnter name to search: ";
    getline(cin, searchName);

    int index = searchRecord(records, searchName);
    if (index != -1) {
        cout << "Record found: " << endl;
        cout << "Name: " << records[index].name 
             << ", DOB: " << records[index].dob 
             << ", Phone: " << records[index].phone << endl;
    } else {
        cout << "Record not found." << endl;
    }

    return 0;
}
