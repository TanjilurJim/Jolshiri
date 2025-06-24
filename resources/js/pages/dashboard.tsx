import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { BarChart, LandPlot, Map, DollarSign, User, Calendar, Home, LayoutGrid, Search, Filter, Users, FileCheck, Key } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    // Mock data for dashboard
    const stats = [
        { title: 'Total Plots', value: '142', change: '+12%', icon: LandPlot, color: 'bg-primary' },
        { title: 'Available Plots', value: '38', change: '-3%', icon: Home, color: 'bg-accent' },
        { title: 'Revenue (30d)', value: '$284,500', change: '+18%', icon: DollarSign, color: 'bg-deep-teal' },
        { title: 'New Clients', value: '24', change: '+8%', icon: User, color: 'bg-sky-blue' },
        { title: 'Total Clients', value: '186', change: '+5%', icon: Users, color: 'bg-sunset-orange' },
        { title: 'Plots Handed Over', value: '100/142', change: '70%', icon: Key, color: 'bg-primary/80' },
    ];

    const mutationStages = [
        { stage: 'Application', count: 42, color: 'bg-primary' },
        { stage: 'Verification', count: 28, color: 'bg-sky-blue' },
        { stage: 'Approval', count: 15, color: 'bg-accent' },
        { stage: 'Completed', count: 57, color: 'bg-deep-teal' },
    ];

    const recentActivities = [
        { id: 1, plot: 'Plot #A-12', action: 'sold', client: 'John Smith', time: '2 hours ago' },
        { id: 2, plot: 'Plot #B-07', action: 'reserved', client: 'Sarah Johnson', time: '1 day ago' },
        { id: 3, plot: 'Plot #C-22', action: 'documentation', client: 'Michael Chen', time: '2 days ago' },
        { id: 4, plot: 'Plot #D-15', action: 'payment received', client: 'Emma Rodriguez', time: '3 days ago' },
    ];

    const handoverBatches = [
        { batch: 'Batch-2023-01', plots: 100, date: '15 Jan 2023', status: 'Completed' },
        { batch: 'Batch-2023-02', plots: 100, date: '28 Mar 2023', status: 'Completed' },
        { batch: 'Batch-2023-03', plots: 100, date: '10 Jun 2023', status: 'In Progress' },
        { batch: 'Batch-2023-04', plots: 100, date: 'Estimated Aug 2023', status: 'Pending' },
    ];

    const salesData = [
        { month: 'Jan', plots: 12, revenue: 85000 },
        { month: 'Feb', plots: 18, revenue: 125000 },
        { month: 'Mar', plots: 15, revenue: 110000 },
        { month: 'Apr', plots: 22, revenue: 165000 },
        { month: 'May', plots: 19, revenue: 142000 },
        { month: 'Jun', plots: 24, revenue: 184500 },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            
            <div className="flex flex-col gap-6 p-6 overflow-x-auto">
                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Plot Management Dashboard</h1>
                        <p className="text-muted-foreground">Welcome back! Here's what's happening with your properties today.</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search plots, clients, or locations..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-input focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-accent/10 transition-colors">
                            <Filter className="h-4 w-4" />
                            <span>Filters</span>
                        </button>
                    </div>
                </div>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-card rounded-xl border border-border p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-muted-foreground text-sm">{stat.title}</p>
                                    <h3 className="text-2xl font-bold mt-1 text-foreground">{stat.value}</h3>
                                </div>
                                <div className={`${stat.color} p-3 rounded-lg text-primary-foreground`}>
                                    <stat.icon className="h-6 w-6" />
                                </div>
                            </div>
                            <p className="text-accent mt-3 text-sm font-medium">{stat.change} from last month</p>
                        </div>
                    ))}
                </div>
                
                {/* Mutation Status */}
                <div className="bg-card rounded-xl border border-border p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold text-foreground">Mutation Status</h2>
                        <span className="text-muted-foreground text-sm">Updated: Today, 10:30 AM</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {mutationStages.map((stage, index) => (
                            <div key={index} className="border border-border rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-medium text-foreground">{stage.stage}</h3>
                                    <div className={`${stage.color} w-3 h-3 rounded-full`}></div>
                                </div>
                                <div className="mt-2 flex items-end justify-between">
                                    <span className="text-2xl font-bold text-foreground">{stage.count}</span>
                                    <span className="text-muted-foreground text-sm">plots</span>
                                </div>
                                <div className="mt-3 h-2 bg-border rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full ${stage.color} rounded-full`} 
                                        style={{ width: `${(stage.count / 142) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-border">
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Total in process: 85 plots</span>
                            <button className="flex items-center gap-2 text-primary text-sm font-medium">
                                View All Applications
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Sales Chart */}
                    <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-foreground">Sales Performance</h2>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                                    Plots Sold
                                </span>
                                <span className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full bg-deep-teal"></div>
                                    Revenue
                                </span>
                            </div>
                        </div>
                        
                        <div className="h-72">
                            <div className="relative h-full w-full overflow-hidden rounded-lg border border-border">
                                {/* Chart visualization */}
                                <div className="absolute inset-0 flex flex-col">
                                    <div className="flex-1 flex items-end border-b border-border">
                                        {salesData.map((item, index) => (
                                            <div key={index} className="flex-1 flex flex-col items-center justify-end h-full px-1">
                                                <div className="flex items-end justify-center gap-1 w-full h-5/6">
                                                    <div 
                                                        className="w-3/4 bg-primary rounded-t" 
                                                        style={{ height: `${(item.plots / 24) * 100}%` }}
                                                    ></div>
                                                    <div 
                                                        className="w-3/4 bg-deep-teal rounded-t" 
                                                        style={{ height: `${(item.revenue / 200000) * 100}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-xs text-muted-foreground mt-1">{item.month}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/10 dark:stroke-neutral-100/10" />
                            </div>
                        </div>
                    </div>
                    
                    {/* Recent Activities */}
                    <div className="bg-card rounded-xl border border-border p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-foreground">Recent Activities</h2>
                            <button className="text-primary text-sm font-medium">View All</button>
                        </div>
                        
                        <div className="space-y-4">
                            {recentActivities.map(activity => (
                                <div key={activity.id} className="flex items-start gap-3">
                                    <div className="mt-1">
                                        <div className="bg-accent/10 p-2 rounded-full text-accent">
                                            <Calendar className="h-4 w-4" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-medium text-foreground">
                                            <span className="capitalize">{activity.action}</span> - {activity.plot}
                                        </p>
                                        <p className="text-sm text-muted-foreground">by {activity.client}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Plot Handover Batches */}
                    <div className="bg-card rounded-xl border border-border p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-foreground">Plot Handover Batches</h2>
                            <button className="text-primary text-sm font-medium">View History</button>
                        </div>
                        
                        <div className="space-y-4">
                            {handoverBatches.map((batch, index) => (
                                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                                    <div>
                                        <p className="font-medium text-foreground">{batch.batch}</p>
                                        <p className="text-sm text-muted-foreground">{batch.plots} plots</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-foreground">{batch.date}</p>
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                            batch.status === 'Completed' 
                                                ? 'bg-deep-teal/10 text-deep-teal' 
                                                : batch.status === 'In Progress' 
                                                    ? 'bg-primary/10 text-primary' 
                                                    : 'bg-border text-muted-foreground'
                                        }`}>
                                            {batch.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            
                            <div className="mt-6 pt-4 border-t border-border">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-medium text-foreground">Next Handover</h3>
                                        <p className="text-sm text-muted-foreground">Batch-2023-03: 100 plots</p>
                                    </div>
                                    <button className="px-3 py-1.5 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
                                        Prepare Docs
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Map Overview */}
                    <div className="lg:col-span-3 bg-card rounded-xl border border-border p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-foreground">Plot Locations</h2>
                            <div className="flex gap-2">
                                <button className="px-3 py-1.5 text-sm rounded-lg border border-border bg-card hover:bg-accent/10">
                                    Phase 1
                                </button>
                                <button className="px-3 py-1.5 text-sm rounded-lg border border-border bg-card hover:bg-accent/10">
                                    Phase 2
                                </button>
                                <button className="px-3 py-1.5 text-sm rounded-lg bg-primary text-primary-foreground">
                                    All Plots
                                </button>
                            </div>
                        </div>
                        
                        <div className="relative aspect-video overflow-hidden rounded-lg border border-border">
                            {/* Map visualization */}
                            <div className="absolute inset-0 bg-gradient-to-br from-sky-blue/20 to-deep-teal/10">
                                {/* Plot markers */}
                                <div className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center">
                                    <span className="text-xs font-bold text-primary">A-12</span>
                                </div>
                                <div className="absolute top-1/3 right-1/4 w-8 h-8 rounded-full border-2 border-accent bg-accent/10 flex items-center justify-center">
                                    <span className="text-xs font-bold text-accent">B-07</span>
                                </div>
                                <div className="absolute bottom-1/3 left-1/3 w-8 h-8 rounded-full border-2 border-deep-teal bg-deep-teal/10 flex items-center justify-center">
                                    <span className="text-xs font-bold text-deep-teal">C-22</span>
                                </div>
                                <div className="absolute bottom-1/4 right-1/3 w-8 h-8 rounded-full border-2 border-sunset-orange bg-sunset-orange/10 flex items-center justify-center">
                                    <span className="text-xs font-bold text-sunset-orange">D-15</span>
                                </div>
                                
                                {/* Handover areas */}
                                <div className="absolute top-1/3 left-1/5 w-24 h-16 rounded-lg border-2 border-deep-teal bg-deep-teal/5 flex items-center justify-center">
                                    <span className="text-xs font-bold text-deep-teal">Handover Area</span>
                                </div>
                                
                                {/* Roads */}
                                <div className="absolute top-1/2 left-0 right-0 h-1 bg-border/50"></div>
                                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border/50"></div>
                                
                                {/* Legend */}
                                <div className="absolute bottom-4 left-4 bg-card p-3 rounded-lg border border-border shadow-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                                        <span className="text-xs">Sold</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-3 h-3 rounded-full bg-accent"></div>
                                        <span className="text-xs">Available</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-sunset-orange"></div>
                                        <span className="text-xs">Reserved</span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="w-3 h-3 rounded border-2 border-deep-teal"></div>
                                        <span className="text-xs">Handover Area</span>
                                    </div>
                                </div>
                            </div>
                            
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/10 dark:stroke-neutral-100/10" />
                        </div>
                    </div>
                    
                    {/* Plot Status Overview */}
                    <div className="bg-card rounded-xl border border-border p-6">
                        <h2 className="text-lg font-semibold text-foreground mb-6">Plot Status Distribution</h2>
                        
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-foreground">Sold Plots</span>
                                    <span className="text-sm font-medium text-foreground">72%</span>
                                </div>
                                <div className="h-2 bg-border rounded-full overflow-hidden">
                                    <div className="h-full bg-primary rounded-full" style={{ width: '72%' }}></div>
                                </div>
                            </div>
                            
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-foreground">Available Plots</span>
                                    <span className="text-sm font-medium text-foreground">24%</span>
                                </div>
                                <div className="h-2 bg-border rounded-full overflow-hidden">
                                    <div className="h-full bg-accent rounded-full" style={{ width: '24%' }}></div>
                                </div>
                            </div>
                            
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-foreground">Reserved Plots</span>
                                    <span className="text-sm font-medium text-foreground">4%</span>
                                </div>
                                <div className="h-2 bg-border rounded-full overflow-hidden">
                                    <div className="h-full bg-sunset-orange rounded-full" style={{ width: '4%' }}></div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-6">
                            <h3 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-border bg-card hover:bg-accent/10 transition-colors">
                                    <LandPlot className="h-6 w-6 text-primary mb-2" />
                                    <span className="text-sm">Add Plot</span>
                                </button>
                                <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-border bg-card hover:bg-accent/10 transition-colors">
                                    <User className="h-6 w-6 text-deep-teal mb-2" />
                                    <span className="text-sm">Add Client</span>
                                </button>
                                <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-border bg-card hover:bg-accent/10 transition-colors">
                                    <DollarSign className="h-6 w-6 text-accent mb-2" />
                                    <span className="text-sm">Record Payment</span>
                                </button>
                                <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-border bg-card hover:bg-accent/10 transition-colors">
                                    <FileCheck className="h-6 w-6 text-sky-blue mb-2" />
                                    <span className="text-sm">Initiate Handover</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}