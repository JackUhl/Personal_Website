import { beforeEach,describe, expect, it } from "vitest";

import { PushEvent } from "./AnalyticsService";

describe('AnalyticsService', () => {
    beforeEach(() => {
        window.dataLayer = [];
    });

    it('PushEvent pushes to window.dataLayer', () => {
        PushEvent('test_event');

        expect(window.dataLayer).toHaveLength(1);
        expect(window.dataLayer[0]).toEqual({ event: 'test_event' });
    });
})