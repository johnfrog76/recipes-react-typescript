import React, { useState, useContext, useEffect } from "react";

import { MainSection } from "../../components/atoms/main-section/main-section.component";
import PageTitle from "../../components/atoms/page-title/page-title.component";
import { RecipesContext } from '../../providers/recipes/recipes.provider';
import { AuthContext } from "../../providers/auth/auth.provider";
import Spinner from "../../components/molecules/spinner/spinner.component";
import EmptyMesssage from "../../components/atoms/empty-message/empty-message.component";
import { StyledSpinnerWrap, PageTitleWrapper } from "./activities.styles";
import { getRecentActivities, fetchFilterValues } from "./activities.util";
import { iActivity } from "../../interfaces/activity/activity.interface";
import ActivityItem from "../../components/molecules/activity-item/activity-item.component";
import SelectOptionPlain, { iKeyValuePair } from "../../components/atoms/select-option-plain/select-option-plain.component";

const ActivitiesPage = () => {
    const { isLoading, recipeItems } = useContext(RecipesContext);
    const [activitesList, setActivitiesList] = useState<iActivity[]>([]);
    const [filterdActivitiesList, setFilteredActivitiesList] = useState<iActivity[]>([]);
    const { user } = useContext(AuthContext);
    const [filterValue, setFilterValue] = useState<string>('all');

    const filterChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        const val = evt.target.value;
        setFilterValue(val);
        const tempList = fetchFilterValues(val, activitesList);
        setFilteredActivitiesList(tempList);
    };

    useEffect(() => {
        if (user) {
            const tempList = getRecentActivities(user?.userId, recipeItems)
            setActivitiesList(tempList);
            setFilteredActivitiesList(tempList);
        }

    }, [recipeItems, user]);

    return (
        <MainSection>
            <PageTitleWrapper>
                <PageTitle>Activity <span>({filterdActivitiesList.length})</span></PageTitle>
                <SelectOptionPlain
                    optionData={[
                        {
                            id: 'all',
                            name: 'Show All'
                        },
                        {
                            id: 'dayOne',
                            name: 'One Day',
                        }, {
                            id: 'weekOne',
                            name: 'One Week'
                        }, {
                            id: '30days',
                            name: '30 Days'
                        }
                    ]}
                    id="activityFilter"
                    name="Filters"
                    value={filterValue}
                    handleChange={filterChange}
                />
            </PageTitleWrapper>
            <ul>
                {
                    !isLoading && filterdActivitiesList.length > 0 &&
                    filterdActivitiesList.map((item, key) => (
                        <ActivityItem key={key} {...item} />
                    ))
                }
                {
                    !isLoading && filterdActivitiesList.length === 0 &&
                    <EmptyMesssage msg={'There are no activites'} />
                }
            </ul>
            {
                isLoading && (
                    <StyledSpinnerWrap>
                        <Spinner />
                    </StyledSpinnerWrap>
                )
            }
        </MainSection >
    );
};

export default ActivitiesPage;