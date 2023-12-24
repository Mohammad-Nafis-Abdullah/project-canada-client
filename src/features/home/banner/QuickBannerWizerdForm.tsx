import { Button } from "@mantine/core";
import React, { Dispatch, SetStateAction, useState } from "react";
import Switch from "~/UI/Switch";

type Option_type =
  | "corporate"
  | "sole_proprietorship"
  | "partnership"
  | "profitable_corporation"
  | "non_profitable_corporation"
  | "all_over_canada"
  | "";

const QuickBusinessWizardForm = () => {
  const [option, setOption] = useState<Option_type>("corporate");
  const [path, setPath] = useState<Option_type[]>([]);

  const pushToPath = (current: Option_type, index: number) => {
    const array = [...path];
    array[index - 1] = current;
    setPath(array);
  };

  const popToPath = () => {
    const array = [...path];
    array.pop();
    setPath(array);
  };

  return (
    <div className="bg-white rounded p-5 flex flex-col">
      <h3 className="text-xl font-bold mb-2">Type of Business :</h3>
      <section className="flex gap-3 justify-center">
        <Button
          radius="sm"
          variant={path[0] === "corporate" ? "filled" : "light"}
          onClick={() => {
            setPath(["corporate"]);
            setOption("corporate");
          }}
        >
          corporate
        </Button>
        <Button
          radius="sm"
          variant={path[0] === "sole_proprietorship" ? "filled" : "light"}
          onClick={() => {
            setPath(["sole_proprietorship"]);
            setOption("sole_proprietorship");
          }}
          //   className={`${
          //     path[0] === "sole_proprietorship"
          //       ? "btn_primary_fill"
          //       : "btn_primary"
          //   }`}
        >
          sole_proprietorship
        </Button>
        <Button
          radius="sm"
          variant={path[0] === "partnership" ? "filled" : "light"}
          onClick={() => {
            setPath(["partnership"]);
            setOption("partnership");
          }}
          className={`${
            path[0] === "partnership" ? "btn_primary_fill" : "btn_primary"
          }`}
        >
          partnership
        </Button>
      </section>
      <section className="grow bg-slate-300 rounded p-5 mt-3">
        <ShowPath paths={path} setPath={setPath} setOption={setOption} />
        <Switch case_key={option}>
          <Switch.Case case_value={["corporate"]}>
            <h3 className="font-bold mb-2 text-gray-800">Do you want ?</h3>
            <section className="flex gap-3 justify-center">
              <Button
                radius="sm"
                onClick={() => {
                  pushToPath("profitable_corporation", 2);
                  setOption("profitable_corporation");
                }}
                className={`${
                  option === "profitable_corporation"
                    ? "btn_primary_fill"
                    : "btn_primary"
                } btn-sm`}
              >
                Profitable Corporation
              </Button>
              <Button
                radius="sm"
                onClick={() => {
                  pushToPath("non_profitable_corporation", 2);
                  setOption("non_profitable_corporation");
                }}
                className={`${
                  option === "non_profitable_corporation"
                    ? "btn_primary_fill"
                    : "btn_primary"
                } btn-sm`}
              >
                Non-Profitable Corporation
              </Button>
            </section>
          </Switch.Case>
        </Switch>
      </section>
    </div>
  );
};

export default QuickBusinessWizardForm;

const ShowPath = ({
  paths,
  setPath,
  setOption
}: {
  paths: Option_type[];
  setPath: Dispatch<SetStateAction<Option_type[]>>;
  setOption: Dispatch<SetStateAction<Option_type>>;
}) => {
  return (
    <section>
      {[...paths].map((path, i) => {
        return (
          <span className="text-xs text-gray-500" key={i}>
            {i > 0 && "->"}{" "}
            <Button
              radius="sm"
              className="hover:underline"
              onClick={() => {
                setOption(path);
                setPath((prev) => {
                  const paths = [...prev].slice(0, i + 1);
                  return paths;
                });
              }}
            >
              {path}
            </Button>{" "}
          </span>
        );
      })}
    </section>
  );
};
