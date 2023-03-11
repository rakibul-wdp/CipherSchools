import styled from 'styled-components';

export const NotificationWindowContainer = styled.div`
   user-select: none;

   .badge {
      position: absolute;
      top: 0;
      right: -0.25rem;
      aspect-ratio: 1/1;
      height: 1.75rem;
      background-color: green;
      display: flex;
      color: #ffffff;
      font-size: 1rem;
      line-height: 1;
      align-items: center;
      justify-content: center;
      border-radius: 10rem;
   }
`;

export const NotificationWindowIcon = styled.div`
   height: 4.5rem;
   width: 4.5rem;
   border-radius: 10rem;
   overflow: hidden;
   display: flex;
   align-items: center;
   justify-content: center;
   transition: 0.15s ease;
   cursor: pointer;

   &:hover,
   &.true {
      background-color: #f2f5fa;
   }

   svg {
      height: 2.5rem;
      width: auto;
      color: rgba(0, 0, 0, 0.95);
   }
`;

export const NotificationWindowPopup = styled.div`
   position: absolute;
   top: calc(100% + 2.5rem);
   right: 0;
   padding: 1.5rem;
   padding-right: 1rem;
   background-color: #ffffff;
   border-radius: 2rem;
   box-shadow: 0 0 1rem rgba(0, 0, 0, 0.025);
   width: 320px;
   z-index: 50;

   & > * {
      max-height: 45rem;
      overflow-x: hidden;
      overflow-y: auto;
      padding-right: 0.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
   }

   button {
      height: 3.6rem;
      font-size: 1.3rem;
      margin-top: 1.25rem;
   }

   @media screen and (max-width: 450px) {
      width: calc(100vw - 4rem);
      right: -8rem;
   }
`;

export const NotificationWindowPopupTitle = styled.h1`
   padding-bottom: 0.5rem;
   width: 100%;
   margin-left: 1rem;
`;
