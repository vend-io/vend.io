"use strict";
var Options = (function () {
    function Options() {
        this.debug = false;
        this.selection = {
            type: "single"
        };
        this.ui = {
            rows: 1,
            columns: 2
        };
        this.payment = {
            methods: [
                "coin"
            ],
            currency: {
                default: "US",
                accepted: [
                    "US",
                    "JPY"
                ]
            }
        };
    }
    return Options;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Options;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9vcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQTtJQUFBO1FBQ0UsVUFBSyxHQUFHLEtBQUssQ0FBQztRQUNkLGNBQVMsR0FBb0I7WUFDM0IsSUFBSSxFQUFFLFFBQVE7U0FDZixDQUFDO1FBRUYsT0FBRSxHQUFhO1lBSWIsSUFBSSxFQUFFLENBQUM7WUFFUCxPQUFPLEVBQUUsQ0FBQztTQUNYLENBQUM7UUFDRixZQUFPLEdBQWtCO1lBRXZCLE9BQU8sRUFBRTtnQkFDUCxNQUFNO2FBSVA7WUFFRCxRQUFRLEVBQUU7Z0JBQ1IsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsUUFBUSxFQUFFO29CQUNSLElBQUk7b0JBQ0osS0FBSztpQkFDTjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFBRCxjQUFDO0FBQUQsQ0FBQyxBQS9CRCxJQStCQztBQS9CRDt5QkErQkMsQ0FBQSJ9