import React from 'react';
import { render, waitForElement, fireEvent } from 'react-testing-library';

import mockAxios from 'axios';

import App from '../App';

import repositoriesData from './testRepositoriesData.json';
import testCommentsData from './testCommentsData.json';

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


it('should render a list with several repositories', async () => {

  const { repositories } = setup();
  mockAxios.__mock.instance.get.mockImplementationOnce( () => Promise.resolve(
    repositories
  ));

  const { getByText } = render(<App/>);

  await waitForElement( () => getByText( 'freeCodeCamp' ) );

  expect( getByText( 'freeCodeCamp' ) ).toBeInTheDocument();
  expect( getByText( 'react' ) ).toBeInTheDocument();

});

it("should show the repo's comments when clicking on one of them", async () => {

  const { repositories, comments } = setup();
  //Mock repo's http request
  mockAxios.__mock.instance.get.mockImplementationOnce( () => Promise.resolve(
    repositories
  ));

  const { getByTestId, getByText } = render(<App/>);
  
  await waitForElement( () => getByText( 'react' ) );


  //Mock comments' http request
  mockAxios.__mock.instance.get.mockImplementationOnce( () => Promise.resolve({
    comments
  }));

  const clickableNode = getByTestId( 'selectable-repo-react-10270250' );
  fireEvent.click( clickableNode );

  expect(
    getByText(`Shouldn't clearInterval be defined somewhere in this example?\n`)
  ).toBeInTheDocument();

});