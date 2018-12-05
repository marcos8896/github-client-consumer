import React from 'react';
import { render, waitForElement, fireEvent } from 'react-testing-library';

import mockAxios from 'axios';

import App from '../App';

import repositoriesData from './testRepositoriesData.json';
import testCommentsData from './testCommentsData.json';

jest.mock( 'lodash.debounce', () => jest.fn( ( fn ) => fn ) );

const setup = () => {
  return {
    repositories: repositoriesData,
    comments: testCommentsData.reverse()
  };
};


it('should render a search input', () => {

  const { getByLabelText } = render(<App/>);
  expect( getByLabelText('Search repositories') ).toBeInTheDocument();

});


it('should render a list with several repositories when searching', async () => {

  const { repositories } = setup();
  mockAxios.__mock.instance.get.mockImplementationOnce( () => Promise.resolve({
    data: {
      items: repositories
    }
  }));

  const { getByText, getByLabelText } = render(<App/>);
  const searchNode = getByLabelText('Search repositories');
  fireEvent.change( searchNode, { target: { value: 'react' } });
  await waitForElement( () => getByText( 'freeCodeCamp/freeCodeCamp' ) );


  expect( getByText( 'freeCodeCamp/freeCodeCamp' ) ).toBeInTheDocument();
  expect( getByText( 'facebook/react' ) ).toBeInTheDocument();

});

it("should show the repo's comments when clicking on one of them", async () => {

  const { repositories, comments } = setup();
  mockAxios.__mock.instance.get.mockImplementationOnce( () => Promise.resolve({
    data: {
      items: repositories
    }
  }));

  const { getByText, getByLabelText, getByTestId } = render(<App/>);
  const searchNode = getByLabelText('Search repositories');
  fireEvent.change( searchNode, { target: { value: 'react' } });
  await waitForElement( () => getByText( 'freeCodeCamp/freeCodeCamp' ) );

  mockAxios.__mock.instance.get.mockImplementationOnce( () => Promise.resolve({
    data: comments
  }));

  const clickableNode = getByTestId( 'selectable-repo-freeCodeCamp-28457823' );
  fireEvent.click( clickableNode );

  await waitForElement( () => getByText(`This was actually needed.`, { exact: false }));

  expect( 
    getByText(`This was actually needed. If you don't do that`, { exact: false })
  ).toBeInTheDocument();

});