/* jshint -W079 */
var mockData = (function () {
    return {
        getMockProjects: getMockProjects,
        getMockStates: getMockStates
    };

    function getMockStates() {
        return [
            {
                state: 'projects',
                config: {
                    url: '/',
                    templateUrl: 'app/projects/projects.html',
                    title: 'projects',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-folder-open-o"></i> Projects'
                    }
                }
            }
        ];
    }

    function getMockProjects() {
        return [
            {
                name: 'Project Aardvark',
                overallStatus: 'G',
                budgetStatus: 'G',
                resourceStatus: 'G',
                scheduleStatus: 'G',
                projectManager: 'Steve Hart'
            },
            {
                name: 'Project Basketball',
                overallStatus: 'Y',
                budgetStatus: 'Y',
                resourceStatus: 'G',
                scheduleStatus: 'G',
                projectManager: 'Laura Pietrek'
            },
            {
                name: 'Project Omega',
                overallStatus: 'R',
                budgetStatus: 'Y',
                resourceStatus: 'R',
                scheduleStatus: 'R',
                projectManager: 'John Matthews'
            },
            {
                name: 'Project Capstone',
                overallStatus: 'Y',
                budgetStatus: 'G',
                resourceStatus: 'Y',
                scheduleStatus: 'G',
                projectManager: 'Steve Hart'
            },
            {
                name: 'Project Beta',
                overallStatus: 'R',
                budgetStatus: 'R',
                resourceStatus: 'G',
                scheduleStatus: 'G',
                projectManager: 'John Matthews'
            }
        ];
    }
})();
