/* eslint-disable react-hooks/exhaustive-deps */
import { Anchor, Breadcrumbs, Button, Paper, Tabs } from "@mantine/core";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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

const QuickBusinessWizardForm = () => {
    const [option, setOption] = useState<Option_type>("");
    const [activeTab, setActiveTab] = useState<string | null>("corporate");
    const [path, setPath] = useState<Option_type[]>(["corporate"]);

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

    useEffect(() => {
        pushToPath(activeTab as Option_type, 1);
    }, [activeTab]);

    return (
        <Paper shadow="sm">
            <Tabs
                variant="outline"
                defaultValue="gallery"
                onChange={setActiveTab}
                value={activeTab}
            >
                <div className="bg-white rounded p-5 flex flex-col">
                    <h3 className="text-xl font-bold mb-2">
                        Type of Business :
                    </h3>
                    <Tabs.List>
                        <Tabs.Tab value="corporate">
                            <span className="text-base font-bold text-primary">
                                Corporate
                            </span>
                        </Tabs.Tab>
                        <Tabs.Tab value="sole_proprietorship">
                            <span className="text-base font-bold text-primary">
                                Sole Proprietorship
                            </span>
                        </Tabs.Tab>
                        <Tabs.Tab value="partnership">
                            <span className="text-base font-bold text-primary">
                                Partnership
                            </span>
                        </Tabs.Tab>
                    </Tabs.List>
                    <section className="grow bg-primary/20 rounded p-5 mt-3">
                        <ShowPath
                            paths={path}
                            setPath={setPath}
                            setOption={setOption}
                        />
                        <Switch case_key={option}>
                            <Tabs.Panel value="corporate">corporate</Tabs.Panel>
                            <Tabs.Panel value="sole_proprietorship">
                                sole_proprietorship
                            </Tabs.Panel>
                            <Tabs.Panel value="partnership">
                                partnership
                            </Tabs.Panel>
                            <Switch.Case case_value={["corporate"]}>
                                <h3 className="font-bold mb-2 text-gray-800">
                                    Do you want ?
                                </h3>
                                <section className="flex gap-3 justify-center">
                                    <Button
                                        radius="sm"
                                        onClick={() => {
                                            pushToPath(
                                                "profitable_corporation",
                                                2
                                            );
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
                                            pushToPath(
                                                "non_profitable_corporation",
                                                2
                                            );
                                            setOption(
                                                "non_profitable_corporation"
                                            );
                                        }}
                                        className={`${
                                            option ===
                                            "non_profitable_corporation"
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
            </Tabs>
        </Paper>
    );
};

export default QuickBusinessWizardForm;

const ShowPath = ({
    paths,
    setPath,
    setOption,
}: {
    paths: Option_type[];
    setPath: Dispatch<SetStateAction<Option_type[]>>;
    setOption: Dispatch<SetStateAction<Option_type>>;
}) => {
    return (
        <Breadcrumbs separator="→" mt="xs">
            {[...paths].map((path, i) => {
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
