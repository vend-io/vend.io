"use strict";
var _ = require('lodash');
var Options = (function () {
    function Options(options) {
        this.defaults = {
            debug: false,
            selection: { type: "single" },
            ui: { rows: 1, columns: 2 },
            payment: {
                methods: ["cash"],
                currency: { default: "US", accepted: ["US", "JPY"] }
            }
        };
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
                "cash"
            ],
            currency: {
                default: "us",
                accepted: [
                    "us",
                    "jpy"
                ]
            }
        };
        if (options) {
            _.merge(this, _.defaultsDeep(options, this.defaults));
        }
    }
    return Options;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Options;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9vcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUU1QjtJQTJDRSxpQkFBWSxPQUFzQjtRQTFDbEMsYUFBUSxHQUFpQjtZQUN2QixLQUFLLEVBQUUsS0FBSztZQUNaLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7WUFDN0IsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQzNCLE9BQU8sRUFBRTtnQkFDUCxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7Z0JBQ2pCLFFBQVEsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFO2FBQ3JEO1NBQ0YsQ0FBQztRQUVGLFVBQUssR0FBRyxLQUFLLENBQUM7UUFFZCxjQUFTLEdBQW9CO1lBRTNCLElBQUksRUFBRSxRQUFRO1NBQ2YsQ0FBQztRQUVGLE9BQUUsR0FBYTtZQUliLElBQUksRUFBRSxDQUFDO1lBRVAsT0FBTyxFQUFFLENBQUM7U0FDWCxDQUFDO1FBRUYsWUFBTyxHQUFrQjtZQUV2QixPQUFPLEVBQUU7Z0JBQ1AsTUFBTTthQUNQO1lBRUQsUUFBUSxFQUFFO2dCQUVSLE9BQU8sRUFBRSxJQUFJO2dCQUViLFFBQVEsRUFBRTtvQkFDUixJQUFJO29CQUNKLEtBQUs7aUJBQ047YUFDRjtTQUNGLENBQUM7UUFFQSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFBQyxDQUFDO0lBQ3pFLENBQUM7SUFDSCxjQUFDO0FBQUQsQ0FBQyxBQTlDRCxJQThDQztBQTlDRDt5QkE4Q0MsQ0FBQSJ9