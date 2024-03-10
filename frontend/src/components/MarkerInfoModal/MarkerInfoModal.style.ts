import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const imageWrap = styled.div`
  position: relative;

  width: 85%;

  & img {
    object-fit: cover;
    background-position: center;
    background-size: cover;

    display: block;

    border-radius: 1rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    width: 100%;
    height: 85%;

    user-select: none;
  }

  margin: auto;
  margin-bottom: 1.5rem;
`;

export const description = styled.div`
  position: absolute;

  bottom: 0;
  left: 0;

  font-size: 1.3rem;
  margin-top: 1rem;
  color: #fff;

  width: 100%;

  background-color: rgba(0, 0, 0, 0.5);

  padding: 1rem;

  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;

  & > div {
    white-space: nowrap;
    overflow: hidden;

    text-overflow: ellipsis;
  }

  &:hover > div {
    max-height: 200px;
    word-wrap: break-word;
    white-space: -moz-pre-wrap;
    white-space: pre-wrap;

    overflow: auto;

    text-overflow: none;
  }
`;

export const AddressText = styled.div`
  margin-bottom: 0.5rem;

  font-weight: bold;

  & > div:first-of-type {
    font-size: 0.8rem;
    font-weight: 400;

    color: #777;
  }
`;

export const BottomButtons = styled.div`
  margin-bottom: -1rem;
`;

export const DislikeCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: -5px;
  right: -7px;

  width: 20px;
  height: 13px;

  font-size: 0.5rem;
  color: #fff;

  border-radius: 10px;

  background-color: #ff7e7e;
`;
