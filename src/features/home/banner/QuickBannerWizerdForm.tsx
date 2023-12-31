/* eslint-disable react-hooks/exhaustive-deps */
import {
  Anchor,
  Breadcrumbs,
  Button,
  Menu,
  Paper,
  Select,
  Tabs
} from "@mantine/core";
import { useRouter } from "next/router";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import Switch from "~/UI/Switch";

type Option_type =
  | "corporate"
  | "sole_proprietorship"
  | "partnership"
  | "profitable_corporation"
  | "non_profitable_corporation"
  | "all_over_canada"
  | "provincially"
  | "federal_corporation"
  | "drop_down_list_for_provinces"
  | "federal_non_profit"
  | "professional"
  | "non_professional"
  | "protect_personal_assets"
  | "non_protect_personal_assets"
  | "limited_liability_partnership"
  | "general_partnership"
  | "someone_has_zero_liability"
  | "all_partner_has_equal_/_partial_liability"
  | "limited_partnership"
  | "";

interface Context_Schema {
  pushToPath: (path: Option_type, index: number) => void;
  option: Option_type;
  setOption: React.Dispatch<React.SetStateAction<Option_type>>;
}

const QuickBusinessWizardFormContext = createContext({} as Context_Schema);

const QuickBusinessWizardForm = () => {
  const [option, setOption] = useState<Option_type>("");
  const [activeTab, setActiveTab] = useState<string | null>("corporate");
  const [path, setPath] = useState<Option_type[]>([]);
  const pathIndex_End = useMemo(() => {
    return path.length - 1;
  }, [path]);
  const stepsCount = useMemo(() => {
    return path.length;
  }, [path]);

  const pushToPath = (current: Option_type, index: number) => {
    const array = [...path];
    if (array[index - 1] === current) {
      setPath((prev) => [...prev]);
    } else {
      array[index - 1] = current;
      const newArray = array.slice(0, index);
      setPath(newArray);
      setOption(current);
    }
  };

  const popToPath = () => {
    const array = [...path];
    array.pop();
    setPath(array);
  };

  useEffect(() => {
    pushToPath(activeTab as Option_type, 1);
  }, [activeTab]);

  return (
    <QuickBusinessWizardFormContext.Provider
      value={{ pushToPath, setOption, option }}
    >
      <Paper shadow="sm">
        <Tabs
          variant="outline"
          defaultValue="gallery"
          onChange={setActiveTab}
          value={activeTab}
        >
          <div className="bg-white rounded p-5 flex flex-col">
            <h3 className="text-xl font-bold mb-2">Type of Business :</h3>
            <Tabs.List>
              <Tabs.Tab
                onClick={() => pushToPath("corporate", 1)}
                value="corporate"
              >
                <span className="text-base font-bold text-primary">
                  Corporate
                </span>
              </Tabs.Tab>
              <Tabs.Tab
                onClick={() => pushToPath("sole_proprietorship", 1)}
                value="sole_proprietorship"
              >
                <span className="text-base font-bold text-primary">
                  Sole Proprietorship
                </span>
              </Tabs.Tab>
              <Tabs.Tab
                onClick={() => pushToPath("partnership", 1)}
                value="partnership"
              >
                <span className="text-base font-bold text-primary">
                  Partnership
                </span>
              </Tabs.Tab>
            </Tabs.List>

            <section className="grow bg-primary/10 rounded p-5 mt-3">
              <ShowPath paths={path} setPath={setPath} setOption={setOption} />
              <div className="p-5" />
              <Switch>
                <Tabs.Panel value="corporate">
                  <Switch.Case // if select "corporate"
                    condition={path[0] === "corporate" && stepsCount === 1}
                  >
                    <h3 className="font-bold mb-2 text-gray-800">
                      Do you want ?
                    </h3>
                    <section className="flex gap-3 justify-center">
                      <StepBtn
                        label="Profitable Corporation"
                        pathIndex={2}
                        pathName="profitable_corporation"
                      />
                      <StepBtn
                        label="Non-Profitable Corporation"
                        pathIndex={2}
                        pathName="non_profitable_corporation"
                      />
                    </section>
                  </Switch.Case>

                  <Switch.Case // if select "corporate" -> "profitable_corporation"
                    condition={
                      path[0] === "corporate" &&
                      path[1] === "profitable_corporation" &&
                      stepsCount === 2
                    }
                  >
                    <h3 className="font-bold mb-2 text-gray-800">
                      Do you want name Protection ?
                    </h3>
                    <section className="flex gap-3 justify-center">
                      <StepBtn
                        label="All Over Canada"
                        pathIndex={3}
                        pathName="all_over_canada"
                      />
                      <StepBtn
                        label="Provincially"
                        pathIndex={3}
                        pathName="provincially"
                      />
                    </section>
                  </Switch.Case>

                  <Switch.Case // if select "corporate" -> "profitable_corporation" -> "all_over_canada"
                    condition={
                      path[0] === "corporate" &&
                      path[1] === "profitable_corporation" &&
                      path[2] === "all_over_canada" &&
                      stepsCount === 3
                    }
                  >
                    <section className="flex gap-3 justify-center">
                      <RedirectBtn
                        label="Federal Corporation"
                        url="/incorporate/standard-corporation/federal-corporation"
                      />
                    </section>
                  </Switch.Case>

                  <Switch.Case // if select "corporate" -> "profitable_corporation" -> "provincially"
                    condition={
                      path[0] === "corporate" &&
                      path[1] === "profitable_corporation" &&
                      path[2] === "provincially" &&
                      stepsCount === 3
                    }
                  >
                    <section className="flex gap-3 justify-center">
                      <DropDownBtn
                        label="List for Provinces"
                        list={[
                          { title: "a", url: "a" },
                          { title: "b", url: "b" },
                          { title: "c", url: "c" },
                          { title: "d", url: "d" },
                          { title: "e", url: "e" }
                        ]}
                      />
                    </section>
                  </Switch.Case>

                  <Switch.Case // if select "corporate" -> "non_profitable_corporation"
                    condition={
                      path[0] === "corporate" &&
                      path[1] === "non_profitable_corporation" &&
                      stepsCount === 2
                    }
                  >
                    <h3 className="font-bold mb-2 text-gray-800">
                      Do you want name Protection ?
                    </h3>
                    <section className="flex gap-3 justify-center">
                      <StepBtn
                        label="All Over Canada"
                        pathIndex={3}
                        pathName="all_over_canada"
                      />
                      <StepBtn
                        label="Provincially"
                        pathIndex={3}
                        pathName="provincially"
                      />
                    </section>
                  </Switch.Case>

                  <Switch.Case // if select "corporate" -> "non_profitable_corporation" -> "all_over_canada"
                    condition={
                      path[0] === "corporate" &&
                      path[1] === "non_profitable_corporation" &&
                      path[2] === "all_over_canada" &&
                      stepsCount === 3
                    }
                  >
                    <section className="flex gap-3 justify-center">
                      <RedirectBtn
                        label="Federal Non-Profit"
                        url="/federal-non-profit"
                      />
                    </section>
                  </Switch.Case>

                  <Switch.Case // if select "corporate" -> "non_profitable_corporation" -> "provincially"
                    condition={
                      path[0] === "corporate" &&
                      path[1] === "non_profitable_corporation" &&
                      path[2] === "provincially" &&
                      stepsCount === 3
                    }
                  >
                    <section className="flex gap-3 justify-center">
                      <DropDownBtn
                        label="List for Provinces"
                        list={[
                          { title: "a", url: "a" },
                          { title: "b", url: "b" },
                          { title: "c", url: "c" },
                          { title: "d", url: "d" },
                          { title: "e", url: "e" }
                        ]}
                      />
                    </section>
                  </Switch.Case>
                </Tabs.Panel>

                <Tabs.Panel value="sole_proprietorship">
                  <Switch.Case // if select "sole_proprietorship"
                    condition={
                      path[0] === "sole_proprietorship" && stepsCount === 1
                    }
                  >
                    <section className="flex gap-3 justify-center">
                      <DropDownBtn
                        label="List for Provinces"
                        list={[
                          { title: "a", url: "a" },
                          { title: "b", url: "b" },
                          { title: "c", url: "c" },
                          { title: "d", url: "d" },
                          { title: "e", url: "e" }
                        ]}
                      />
                    </section>
                  </Switch.Case>
                </Tabs.Panel>

                <Tabs.Panel value="partnership">
                  <Switch.Case // if select "partnership"
                    condition={path[0] === "partnership" && stepsCount === 1}
                  >
                    <h3 className="font-bold mb-2 text-gray-800">Are you:</h3>
                    <section className="flex gap-3 justify-center">
                      <StepBtn
                        label="Professional"
                        pathIndex={2}
                        pathName="professional"
                      />
                      <StepBtn
                        label="Non-Professional"
                        pathIndex={2}
                        pathName="non_professional"
                      />
                    </section>
                  </Switch.Case>

                  <Switch.Case // if select "partnership" -> "professional"
                    condition={
                      path[0] === "partnership" &&
                      path[1] === "professional" &&
                      stepsCount === 2
                    }
                  >
                    <h3 className="font-bold mb-2 text-gray-800">--- :</h3>
                    <section className="flex gap-3 justify-center">
                      <StepBtn
                        label="Protect Personal Assets"
                        pathIndex={3}
                        pathName="protect_personal_assets"
                      />
                      <StepBtn
                        label="Non-Protect Personal Assets"
                        pathIndex={3}
                        pathName="non_protect_personal_assets"
                      />
                    </section>
                  </Switch.Case>

                  <Switch.Case // if select "partnership" -> "professional" -> "protect_personal_assets"
                    condition={
                      path[0] === "partnership" &&
                      path[1] === "professional" &&
                      path[2] === "protect_personal_assets" &&
                      stepsCount === 3
                    }
                  >
                    <section className="flex gap-3 justify-center">
                      <RedirectBtn
                        label="Limited Liability Partnership"
                        url="/limited-liability-partnership-llp"
                      />
                    </section>
                  </Switch.Case>

                  <Switch.Case // if select "partnership" -> "professional" -> "non_protect_personal_assets"
                    condition={
                      path[0] === "partnership" &&
                      path[1] === "professional" &&
                      path[2] === "non_protect_personal_assets" &&
                      stepsCount === 3
                    }
                  >
                    <section className="flex gap-3 justify-center">
                      <RedirectBtn
                        label="General partnership"
                        url="/general-partnership"
                      />
                    </section>
                  </Switch.Case>

                  <Switch.Case // if select "partnership" -> "non_professional"
                    condition={
                      path[0] === "partnership" &&
                      path[1] === "non_professional" &&
                      stepsCount === 2
                    }
                  >
                    <h3 className="font-bold mb-2 text-gray-800">--- :</h3>
                    <section className="flex gap-3 justify-center">
                      <StepBtn
                        label="Someone has Zero Liability"
                        pathIndex={3}
                        pathName="someone_has_zero_liability"
                      />
                      <StepBtn
                        label="All partner has Equal/partial Liability"
                        pathIndex={3}
                        pathName="all_partner_has_equal_/_partial_liability"
                      />
                    </section>
                  </Switch.Case>

                  <Switch.Case // if select "partnership" -> "non_professional" -> "someone_has_zero_liability"
                    condition={
                      path[0] === "partnership" &&
                      path[1] === "non_professional" &&
                      path[2] === "someone_has_zero_liability" &&
                      stepsCount === 3
                    }
                  >
                    <section className="flex gap-3 justify-center">
                      <RedirectBtn
                        label="Limited Partnership"
                        url="/limited-partnership-lp"
                      />
                    </section>
                  </Switch.Case>

                  <Switch.Case // if select "partnership" -> "non_professional" -> "all_partner_has_equal_/_partial_liability"
                    condition={
                      path[0] === "partnership" &&
                      path[1] === "non_professional" &&
                      path[2] === "all_partner_has_equal_/_partial_liability" &&
                      stepsCount === 3
                    }
                  >
                    <section className="flex gap-3 justify-center">
                      <RedirectBtn
                        label="General Partnership"
                        url="/general-partnership"
                      />
                    </section>
                  </Switch.Case>
                </Tabs.Panel>
              </Switch>
            </section>
          </div>
        </Tabs>
      </Paper>
    </QuickBusinessWizardFormContext.Provider>
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
  const getPathList = (paths: Option_type[]) => {
    const size = [...paths].length;
    if (size > 3) {
      return [...paths].slice(size - 3, size);
    } else {
      return [...paths];
    }
  };

  return (
    <Breadcrumbs separator="→" mt="xs">
      {[...paths].length > 3 && (
        <span className="text-primary font-bold">. . .</span>
      )}
      {getPathList([...paths]).map((path, i) => {
        return (
          <Anchor
            c={"#c35466"}
            onClick={() => {
              setOption(path);
              setPath((prev) => {
                const paths = [...prev].slice(0, i + 1);
                return paths;
              });
            }}
            key={i}
          >
            {path.split("_").join(" ")}
          </Anchor>
        );
      })}
    </Breadcrumbs>
  );
};

const StepBtn = ({
  pathName,
  pathIndex,
  label
}: {
  pathName: Option_type;
  pathIndex: number;
  label: string;
}) => {
  const { option, setOption, pushToPath } = useContext(
    QuickBusinessWizardFormContext
  );
  return (
    <Button
      radius="sm"
      // variant={option === pathName ? "filled" : "light"}
      variant="outline"
      color="primary"
      onClick={() => {
        pushToPath(pathName, pathIndex);
        setOption(pathName);
      }}
    >
      {label}
    </Button>
  );
};

const RedirectBtn = ({ url, label }: { url: string; label: string }) => {
  const router = useRouter();
  return (
    <Button
      radius="sm"
      variant="filled"
      color="primary"
      onClick={() => router.push(url)}
    >
      {label}
    </Button>
  );
};

const DropDownBtn = ({
  list,
  label
}: {
  list: { title: string; url: string }[];
  label: string;
}) => {
  const [item, setItem] = useState<(typeof list)[number] | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (item) {
      console.log(item);
    }
  }, [item]);

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button radius="sm" variant="filled" color="primary">
          {item ? item.title : label}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {[...list].map((item, i) => {
          return (
            <Menu.Item
              key={i}
              onClick={() => {
                setItem(item);
              }}
            >
              <span className="text-primary font-bold">{item.title}</span>
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
};
