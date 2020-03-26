import get from 'lodash.get';
import {isPresent} from 'avril/js/utils/boolean';

export const hasDelegate = application => isPresent(application.delegate);

export const hasBooklet = application => isPresent(application.bookletData);

export const hasBookletFinished = application => !!get(application, 'bookletData.completed_at');

export const hasMeeting = application => !!application.delegate.meetings.length;