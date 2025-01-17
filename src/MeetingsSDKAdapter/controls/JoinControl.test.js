import {first} from 'rxjs/operators';
import {meetingID, createTestMeetingsSDKAdapter} from '../testHelper';

describe('Join Control', () => {
  let meetingsSDKAdapter;

  beforeEach(() => {
    meetingsSDKAdapter = createTestMeetingsSDKAdapter();
  });

  afterEach(() => {
    meetingsSDKAdapter = null;
  });

  describe('display()', () => {
    test('returns the display data in a proper shape', (done) => {
      meetingsSDKAdapter.meetingControls['join-meeting'].display(meetingID).pipe(first()).subscribe((display) => {
        expect(display).toMatchObject({
          ID: 'join-meeting',
          type: 'JOIN',
          text: 'Join meeting',
          tooltip: 'Join meeting',
          hint: 'Muted, video off',
        });
        done();
      });
    });
  });

  describe('action()', () => {
    test('calls joinMeeting() SDK adapter method', async () => {
      meetingsSDKAdapter.joinMeeting = jest.fn();
      await meetingsSDKAdapter.meetingControls['join-meeting'].action(meetingID);
      expect(meetingsSDKAdapter.joinMeeting).toHaveBeenCalledWith(meetingID);
    });
  });
});
