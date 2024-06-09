import { UseFormReturnType } from "@mantine/form";
import React, { useEffect } from "react";
import { stOntarioInitials } from "~/utils/schemas";
import StepperFormLayout from "../../StepperFormLayout";
import { Box, Radio, Stack, TextInput, Title } from "@mantine/core";

type StOntarioStepSixProps = {
    form: UseFormReturnType<typeof stOntarioInitials>;
};

type ArticleOptions_type = "Standard $0.00" | "Advanced $49" | "Custom $99";

interface CustomEventTarget extends EventTarget {
    blur: () => void;
    focus: () => void;
}

function SharePriceForStandard({ form }: StOntarioStepSixProps) {
    return (
        <StepperFormLayout>
            <Stack gap="lg">
                <Title
                    order={4}
                >{`Share Price (Standard Share Structure)`}</Title>
                <TextInput
                    leftSection={"$"}
                    label="Write initial share price (commonly $1)"
                    placeholder="1.00"
                    type="number"
                    min={1}
                    onWheel={(e) => {
                        (e.target as CustomEventTarget).blur();
                        e.stopPropagation();
                        setTimeout(() => {
                            (e.target as CustomEventTarget).focus();
                        }, 0);
                    }}
                    onKeyDownCapture={(e) => {
                        if (
                            e.key === "ArrowUp" ||
                            e.key === "ArrowDown" ||
                            e.key === "+" ||
                            e.key === "-"
                        ) {
                            e.stopPropagation();
                            e.preventDefault();
                        }
                    }}
                    {...form.getInputProps(`initialSharePrice`)}
                />
            </Stack>
        </StepperFormLayout>
    );
}

function SharePriceForAdvanced({ form }: StOntarioStepSixProps) {
    return (
        <StepperFormLayout>
            <Stack gap="xl">
                <Title
                    order={4}
                >{`Share Price (Advanced Share Structure)`}</Title>
                <TextInput
                    leftSection={"$"}
                    label="Enter price of class A voting share"
                    placeholder="1.00"
                    type="number"
                    min={1}
                    onWheel={(e) => {
                        (e.target as CustomEventTarget).blur();
                        e.stopPropagation();
                        setTimeout(() => {
                            (e.target as CustomEventTarget).focus();
                        }, 0);
                    }}
                    onKeyDownCapture={(e) => {
                        if (
                            e.key === "ArrowUp" ||
                            e.key === "ArrowDown" ||
                            e.key === "+" ||
                            e.key === "-"
                        ) {
                            e.stopPropagation();
                            e.preventDefault();
                        }
                    }}
                    {...form.getInputProps(`priceOfClassAvotingShare`)}
                />
                <Radio.Group
                    label="Will it issue class B non-voting share?"
                    defaultValue="NO"
                    {...form.getInputProps("isClassBnonVotingShareIssued")}
                >
                    <Radio value="YES" mt="xs" label="Yes" />
                    <Radio value="NO" my="xs" label="No" />
                </Radio.Group>
                {form.values.isClassBnonVotingShareIssued === "YES" ? (
                    <TextInput
                        leftSection={"$"}
                        label="Enter price of class B non-voting share"
                        placeholder="1.00"
                        type="number"
                        min={1}
                        onWheel={(e) => {
                            (e.target as CustomEventTarget).blur();
                            e.stopPropagation();
                            setTimeout(() => {
                                (e.target as CustomEventTarget).focus();
                            }, 0);
                        }}
                        onKeyDownCapture={(e) => {
                            if (
                                e.key === "ArrowUp" ||
                                e.key === "ArrowDown" ||
                                e.key === "+" ||
                                e.key === "-"
                            ) {
                                e.stopPropagation();
                                e.preventDefault();
                            }
                        }}
                        {...form.getInputProps(`priceOfClassBnonVotingShare`)}
                    />
                ) : (
                    <></>
                )}
            </Stack>
        </StepperFormLayout>
    );
}

function SharePriceForCustom() {
    return (
        <>
            Fahim eta korish tui; ar ey step er next button kaj kortese na oita
            fixed korish
        </>
    );
}

const StOntario_sharePrice = ({ form }: StOntarioStepSixProps) => {
    const ArticleOptions: ArticleOptions_type = form.values
        .articleOfIncorporation as ArticleOptions_type;

    if (ArticleOptions === "Standard $0.00") {
        return <SharePriceForStandard form={form} />;
    } else if (ArticleOptions === "Advanced $49") {
        return <SharePriceForAdvanced form={form} />;
    } else if (ArticleOptions === "Custom $99") {
        return <SharePriceForCustom />;
    }
};

export default StOntario_sharePrice;
