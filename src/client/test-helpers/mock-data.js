/* jshint -W079 */
var mockData = (function () {
    return {
        getMockProjects: getMockProjects,
        getMockRedProjects: getMockRedProjects,
        getMockYellowProjects: getMockYellowProjects,
        getMockGreenProjects: getMockGreenProjects,
        getMockStates: getMockStates
    };

    function getMockStates() {
        return [
            {
                state: 'projects',
                config: {
                    url: '/projects',
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

    function getMockRedProjects() {
        return [
            {
                name: 'Project Omega',
                overallStatus: 'R',
                budgetStatus: 'Y',
                resourceStatus: 'R',
                scheduleStatus: 'R',
                projectManager: 'John Matthews'
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

    function getMockYellowProjects() {
        return [
            {
                name: 'Project Basketball',
                overallStatus: 'Y',
                budgetStatus: 'Y',
                resourceStatus: 'G',
                scheduleStatus: 'G',
                projectManager: 'Laura Pietrek'
            },
            {
                name: 'Project Capstone',
                overallStatus: 'Y',
                budgetStatus: 'G',
                resourceStatus: 'Y',
                scheduleStatus: 'G',
                projectManager: 'Steve Hart'
            }
        ];
    }

    function getMockGreenProjects() {
        return [
            {
                name: 'Project Aardvark',
                overallStatus: 'G',
                budgetStatus: 'G',
                resourceStatus: 'G',
                scheduleStatus: 'G',
                projectManager: 'Steve Hart'
            }
        ];
    }
})();
