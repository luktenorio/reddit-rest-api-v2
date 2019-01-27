import { expect } from "chai";
import { it, describe } from "mocha";
import { getHandlers } from "../../backend/controllers/link_controler";
import { Link } from "../../backend/entities/Link";
import request from "supertest";
import { createApp } from "../../../src/app";

describe("Link Controller Unit Test", () => {
    it("Should be able to post a link", () => {
        const fakeLink = {
            url: 'http://www.twitter.com/',
            title: 'Twitter'
        };
        const expectedLink = fakeLink;
        const fakeRequest: any = {
            body: fakeLink,
            userId: 1
        };
        const fakeResponse: any = {
            json: (result: object) => {
                expect(result).to.equals(expectedLink)
            }
        };
        const fakeLinkRepository: any = {
            save: (link: Link) => {
                expect(link).to.deep.equal(fakeLink);
                return Promise.resolve(expectedLink);
            }
        };

        const handlers = getHandlers(fakeLinkRepository);
        handlers.postNewLinkHandler(fakeRequest, fakeResponse);
    });

    it("Should be able to post a link by HTTP POST", (done) => {
        (async () => {
            const app = await createApp();
            request(app)
            .post("/api/v1/links")
            .send({
                url: "http://nytimes.com/",
                title: "The New York Times"
            })
            .set('Content-Type', 'application/json')
            .set("x-auth-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ4NjExMzk3fQ.k3AjLiAhYHS06lCDt7gcmqi9UwJbgpBqAEHLwA2K2Qo")
            .expect(200)
            .end(function (err) {
                if (err) throw err;
                done();
            });
        })();
    });
});