import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import Tag from "../components/Tag";
import TagAddbtn from "../components/TagAddbtn";
import * as deicons from "react-icons/di";
import CardAddbtn from "../components/CardAddbtn";
import { URL } from "..";
import { useSelector } from "react-redux";

const Main = () => {
  // const [tools, setTools] = useState([]);
  const [tags, setTags] = useState([{ name: "tags" }]);
  const { tools } = useSelector((state) => state);

  // NOTE get data
  useEffect(() => {
    axios
      .get(`${URL}/api/tag`)
      .then(({ data }) => {
        setTags(data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="container relative overflow-hidden bg-white">
      {/* tag bar */}
      <div className="flex justify-between border-b-2">
        <div className="flex overflow-hidden">
          {tags.map((tag) => (
            <Tag key={tag.name} tag={tag} Logo={deicons[tag.logo]} />
          ))}
        </div>
        <div className="absolute right-0 ">
          <TagAddbtn />
        </div>
      </div>
      {/* tools */}
      <div className="relative flex flex-wrap items-start justify-around px-5 py-10">
        {tools.map((tool) => (
          <Card key={tool.name} tool={tool} Logo={deicons[tool.logo]} />
        ))}
        <CardAddbtn />
      </div>
    </div>
  );
};

export default Main;
