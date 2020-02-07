let {
    emptyVisits,
    veiwVisit,
    updateVisit,
    deleteVisit,
    listAllVisits,
    addNewVisitor
} = require("../src/MyDatabase")

let obj = {

    visitor_name: "KC",
    visitor_age: 12,
    date_of_visit: new Date("04/02/2020"),
    time_of_visit: "15:50:00",
    name_of_assistant: "Sihle",
    comments: "none"
};

let obj1 = {

    visitor_name: "KC"

};

describe("AddNewVisitor function", () => {
    it("Adds a new visiter record to a visitors table", async(done) => {
        record = await addNewVisitor("KC", 12, "04/02/2020", "15:50:00", "Sihle", "none");
        done();
        expect(record[0].visitor_name).toEqual(obj.visitor_name);
        expect(record[0].visitor_age).toEqual(obj.visitor_age);
        expect(record[0].date_of_visit).toEqual(obj.date_of_visit);
        expect(record[0].time_of_visit).toEqual(obj.time_of_visit);
        expect(record[0].name_of_assistant).toEqual(obj.name_of_assistant);
        expect(record[0].comments).toEqual(obj.comments);
    })
})

describe("listAllVisits function", () => {
    it("list all visitors from a visitors table", async(done) => {
        record = await listAllVisits();
        done();
        delete record[0].visitor_id;
        
        expect(record[0]).toEqual(obj1);
        // expect(record).toEqual(obj.name_of_assistant);
        // expect(record).toEqual(obj.comments);
    })
})