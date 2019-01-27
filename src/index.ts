import { createApp } from "./app";

(async () => {
    // Creates app
    const app = await createApp();

    // Start the server
    app.listen(8080, () => {
        console.log(
            "The server is running in port 8080!"
        );
    });
})();
