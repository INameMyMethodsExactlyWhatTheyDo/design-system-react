/*
 * STORY-BASED ACCESSIBILITY TESTING
 *
 * This uses StoryShots to iterate over stories created in Storybook to
 * automatically create aXe tests.
 *
 * For more information, please visit:
 * https://github.com/storybooks/storybook/tree/master/addons/storyshots
 */

// Ran in Jest jsDOM environment

import { axe, toHaveNoViolations } from 'jest-axe';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import initStoryshots from '@storybook/addon-storyshots';

// Add tests to this file to exclude them from testing
import excludeFromTests from './exclude-story-config';
import { getExcludeKindRegex } from './storyshots-helpers';

// Add aXe to Jest expect
expect.extend(toHaveNoViolations);
// Make compatible with React 16
configure({ adapter: new Adapter() });

// Mock canvas for JSDOM tests
window.HTMLCanvasElement.prototype.getContext = () => ({});
// Mock popperJS to prevent it from running in jsDOM
jest.mock('popper.js', () => {
	const PopperJS = jest.requireActual('popper.js');
	return class {
		static placements = PopperJS.placements;

		constructor() {
			return {
				destroy: () => {},
				scheduleUpdate: () => {},
			};
		}
	};
});

console.log(`
★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★
QUEUEING: STORY-BASED STATIC DOM ACCESSIBILITY TESTING
★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★

EXECUTING /tests/story-based-accessibility-tests.js
BASED ON STORYBOOK STORIES FOUND IN /components/story-based-tests.js

This script uses Jest to call aXe https://github.com/dequelabs/axe-core on each 
Storybook story found at http://localhost:9001. This is static testing of the 
DOM on load. If you need an open menu tested, then you will need to open the 
menu with the \`isOpen\` prop.

This test suite may take more than 10 minutes to run through the 70+ rules on 
each Storybook story. If a test fails, you will see the story name 
followed by the HTML element with the issue.

For more information, please review: https://github.com/salesforce/design-system-react/blob/master/tests/README.md
`);

describe('aXe Testing', function aXeFunction() {
	initStoryshots({
		configPath: '.storybook',
		suite: 'aXe storyshots',
		storyKindRegex: getExcludeKindRegex({
			arrayOfStoryKind: excludeFromTests.accessibility.storyKind,
		}),
		test: async ({ story, context }) => {
			const component = story.render(context);
			const wrapper = mount(component);
			expect(
				await axe(wrapper.html(), {
					rules: {
						// Added due to autocomplete bug in browsers. Invalid value of "test" is passed into `autoComplete` intentionally.
						'autocomplete-valid': { enabled: false },
						// .slds-combobox[aria-haspopup="dialog" is not currently supported by aXe-core
						// See issue https://github.com/dequelabs/axe-core/issues/1009
						'aria-required-children': {
							enabled: false,
							selector: '.slds-combobox[aria-haspopup="dialog"',
						},
					},
				})
			).toHaveNoViolations();
		},
	});
});
