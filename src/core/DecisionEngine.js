export class DecisionEngine {

    static async process(message) {

        return {
            action: "AI",
            message
        };

    }

}