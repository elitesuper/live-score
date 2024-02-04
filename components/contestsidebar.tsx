import React, { useState } from "react";
import styled from "styled-components";

const ContestSideBar = styled.div`
  margin-right: 1rem;
  background: white;
  color: #3d3d3d;
  position: relative;
`;

const ContestSideBarHeader = styled.div`
  padding: 8px;
  font-size: 16px;
  width: 300px;
  border: 1px solid #ccc;
  cursor: pointer;
`;

const ContestSideBarBody = styled.div<{ isopen: string }>`
  position: absolute;
  top: 50px;
  display: ${(props) => (props.isopen == "true" ? "block" : "none")};
`;

const SelectButton = styled.div<{active: string}>`
  width: 300px;
  border: solid 1px grey;
  padding: 8px;
  cursor: pointer;
  background: ${(props) => (props.active == "true" ? "#a3a3a3" : "white")};
  &:hover {
    background-color: #a3a3a3;
  }
`;

const filterData = [
  {
    value: "",
    text: "All",
  },
  {
    value: "inprogress",
    text: "Live",
  },
  {
    value: "finished",
    text: "Result",
  },
  {
    value: "notstarted",
    text: "Upcoming",
  },
]

interface SearchInputProps {
  filter: string;
  filterValue: (event: string) => void;
}

interface FilterType {
  value: string,
  text: string
}

export const ContestFilter: React.FC<SearchInputProps> = ({ filter, filterValue }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>({value:'', text:'All'})

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const setFilterValue = (item:FilterType) => {
    setIsSidebarOpen(false);
    setActiveFilter(item)
    filterValue(item.value)
  };

  return (
    <>
      <ContestSideBar>
        <ContestSideBarHeader onClick={handleSidebarToggle}>
          Filters - {activeFilter.text}
        </ContestSideBarHeader>
        <ContestSideBarBody isopen={isSidebarOpen.toString()}>
          {filterData.map((item, index) => 
            <React.Fragment key={index}>
              <SelectButton active={(item.value == filter).toString()} onClick={() => setFilterValue(item)}>{item.text}</SelectButton>
            </React.Fragment>
          )}

        </ContestSideBarBody>
      </ContestSideBar>
    </>
  );
};
