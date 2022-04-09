class GraphQlApi {
  constructor() {
    this.apiURL = "http://localhost:8090/graphql";
  }

  async getAllActivitiesOverview() {
    try {
          const response = await fetch(`${this.apiURL}/`, {
              method: "POST",
              body: JSON.stringify({
                  query: "query getAllActivitiesOverview($purchaserId: String){  getAllActivitiesOverview(salesforcePurchaserId:$purchaserId){ groupClasses privateClasses levelPassed completedLessons completedUnits practiceHours totalHoursUsage  }}",
                  variables: { purchaserId: "12345" },
              }),
              headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json"
              },
          });
          const [response_1, json] = await Promise.all([response, response.json()]);
          return { success: response_1.ok, data: json.data.getAllActivitiesOverview };
      } catch (e) {
          return { success: false, data: this._handleError(e) };
      }
  }

  async getPersons() {
    try {
          const response = await fetch(`${this.apiURL}/`, {
              method: "POST",
              body: JSON.stringify({
                  query: "query getPersons($purchaserId: String){ getPersons(salesforcePurchaserId:$purchaserId){ firstName lastName  email  contactId salesforcePurchaserId  workingLevel{ id name description active numLiveRequired numImmersionRequired sequence lowScoreBoundary highScoreBoundary levelNum }  }}",
                  variables: { purchaserId: "12345" },
              }),
              headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json"
              },
          });
          const [response_1, json] = await Promise.all([response, response.json()]);
          return { success: response_1.ok, data: json.data.getPersons };
      } catch (e) {
          return { success: false, data: this._handleError(e) };
      }
  }

  _handleError(error) {
    const err = new Map([
      [TypeError, "Can't connect to server."],
      [SyntaxError, "There was a problem parsing the response."],
      [Error, error.message],
    ]).get(error.constructor);
    return { message: err };
  }
}

export default GraphQlApi;