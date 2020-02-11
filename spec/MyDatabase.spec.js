const {
    emptyVisits,
    veiwVisit,
    updateVisit,
    deleteVisit,
    listAllVisits,
    addNewVisitor
} = require("../src/MyDatabase");

let obj = {
  date_of_visit: new Date("04/02/2020")
}

describe("node sql addNewVisitor", function() {   
    it("save data to the database", async function(done) {

        objDetails = await addNewVisitor("Nhlanhla Lefatle", 23, "04/02/2020", "11:00:00", "Wandile Nxumalo", "later darling");
        addNewVisitor("Nolo", 12, "04/02/2020", "11:00:00", "Sihle", "none");
        addNewVisitor("KC", 12, "04/02/2020", "11:00:00", "Sihle", "none");
        addNewVisitor("Sihle", 12, "04/02/2020", "11:00:00", "Sihle", "none");
        addNewVisitor("Sbongile", 13, "04/02/2020", "11:00:00", "Sihle", "none");

        expect(objDetails[0].visitor_name).toEqual("Nhlanhla Lefatle");
        expect(objDetails[0].visitor_age).toEqual(23);
        expect(objDetails[0].date_of_visit).toEqual(obj.date_of_visit);
        expect(objDetails[0].time_of_visit).toEqual("11:00:00");
        expect(objDetails[0].name_of_assistant).toEqual("Wandile Nxumalo");
        expect(objDetails[0].comments).toEqual("later darling");

        done();

    }); 
});

describe("node sql listAllVisits", function() {   
    it("should be able to list all visitors", async function(done){

        let list = await listAllVisits();

        expect(list[0].visitor_name).toEqual("Nhlanhla Lefatle");
        expect(list[0].visitor_id).toBeDefined();
        expect(list[1].visitor_name).toEqual("Nolo");
        expect(list[1].visitor_id).toBeDefined();
        expect(list[2].visitor_name).toEqual("KC");
        expect(list[2].visitor_id).toBeDefined();
        expect(list[3].visitor_name).toEqual("Sihle");
        expect(list[3].visitor_id).toBeDefined();
        expect(list[4].visitor_name).toEqual("Sbongile");
        expect(list[4].visitor_id).toBeDefined();

        done();

      });
});

describe("node sql deleteVisit,", function() { 
    it("should be able to delete a visitor", async function(done){

        let deleted = await deleteVisit(3);
        expect(deleted.command).toBe('DELETE');
        expect(deleted.rowCount).toBe(1);
        done();

    });
});

describe("node sql updateVisit,", function() { 
    it("should be able to update a visitor's details", async function (done) {

        let update = await updateVisit(2, "visitor_name", "LEBOHANG");

        expect(update.command).toEqual('UPDATE');
        expect(update.rowCount).toEqual(1);

        done();

    }); 
});

describe("node sql veiwVisit,", function() {  
    it("should be able to view a visitor", async function (done) {
        let view =  await veiwVisit(4);

        expect(view[0].visitor_name).toBe("Sihle");
        expect(view[0].visitor_age).toEqual(12);
        expect(view[0].date_of_visit).toEqual(obj.date_of_visit);
        expect(view[0].time_of_visit).toEqual("11:00:00");
        expect(view[0].name_of_assistant).toEqual("Sihle");
        expect(view[0].comments).toEqual("none");

        done();
    }); 
});

describe("node sql emptyVisits,", function() { 
    it("should be able to delete all visitors", async function (done) {

        expect(await emptyVisits()).not.toBeNull();
        done();
    });
});