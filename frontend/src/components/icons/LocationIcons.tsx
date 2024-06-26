type LocationProps = { selected: boolean; size?: number };
type LocationBoldProps = { selected: boolean };

export const LocationIcon = ({ selected, size = 35 }: LocationProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 36"
      fill="none"
    >
      <path
        d="M18.6962 33.2783C17.9735 33.955 17.0073 34.3333 16.0018 34.3333C14.9963 34.3333 14.0303 33.955 13.3075 33.2783C6.68837 27.0433 -2.18207 20.0782 2.14378 9.9661C4.48272 4.4986 10.0972 1 16.0018 1C21.9065 1 27.521 4.4986 29.86 9.9661C34.1803 20.0655 25.3317 27.0648 18.6962 33.2783Z"
        stroke={selected ? "#222222" : "#F0F0F0"}
        strokeWidth="2"
      />
      <path
        d="M21.8332 16C21.8332 19.2216 19.2215 21.8333 15.9998 21.8333C12.7782 21.8333 10.1665 19.2216 10.1665 16C10.1665 12.7783 12.7782 10.1666 15.9998 10.1666C19.2215 10.1666 21.8332 12.7783 21.8332 16Z"
        stroke={selected ? "#222222" : "#F0F0F0"}
        strokeWidth="2"
      />
    </svg>
  );
};

export const LocationBoldIcon = ({ selected }: LocationBoldProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
    >
      <path
        d="M13.0503 20.4767C12.6348 20.8658 12.0792 21.0833 11.5011 21.0833C10.9229 21.0833 10.3674 20.8658 9.95181 20.4767C6.14581 16.8915 1.04531 12.8866 3.53268 7.07213C4.87756 3.92832 8.10591 1.91663 11.5011 1.91663C14.8962 1.91663 18.1246 3.92832 19.4695 7.07213C21.9537 12.8793 16.8657 16.9039 13.0503 20.4767Z"
        stroke={selected ? "#222222" : "#F0F0F0"}
        strokeWidth="2"
      />
      <path
        d="M14.8542 10.5417C14.8542 12.3941 13.3525 13.8958 11.5 13.8958C9.64758 13.8958 8.14587 12.3941 8.14587 10.5417C8.14587 8.68921 9.64758 7.1875 11.5 7.1875C13.3525 7.1875 14.8542 8.68921 14.8542 10.5417Z"
        stroke={selected ? "#222222" : "#F0F0F0"}
        strokeWidth="2"
      />
    </svg>
  );
};
