#!/bin/bash

# =============================================================================
# Test Runner Script for Uplify 3.0
# =============================================================================
# This script runs tests by views for better organization and debugging
# Edit the TEST_DIRS array below to add/remove test directories

# =============================================================================
# CONFIGURATION - Edit these directories to add/remove test directories
# =============================================================================

# Test directories (add your test directories here)
TEST_DIRS=(
    "src/modules/Auth"
    "src/modules/Streamer/views/Dashboard"
    "src/modules/Streamer/views/Campaigns"
    # "src/modules/Streamer/views/Link"
    "src/modules/Streamer/views/Wallet"
    "src/modules/Streamer/views/Settings"
    "src/modules/Streamer/views/Profile"
    "src/modules/Streamer/views/Referrals"
    "src/modules/Streamer/views/ReferralCheck"
    "src/modules/Streamer/views/Deactivated"
    "src/modules/Streamer/views/TipaltiOnboarding"
    # "src/modules/Partner/views/Advertisers"
    # "src/modules/Partner/views/Analytics"
    "src/modules/Partner/views/Agency"
    "src/modules/Partner/views/Campaigns"
    "src/modules/Partner/views/FormCampaign"
    "src/modules/Partner/views/FormAdset"
    "src/modules/Partner/views/FormCreative"
    "src/modules/Partner/views/Segments"
    # "src/modules/Partner/views/Profile"
    # "src/modules/Panel"
    # "src/modules/Widget"
    # "src/modules/CampaignAnalytics"
)

# =============================================================================
# SCRIPT CONFIGURATION
# =============================================================================

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0
FAILED_FILES=()
SCRIPT_START_TIME=$SECONDS

# =============================================================================
# FUNCTIONS
# =============================================================================

print_header() {
    echo -e "${BLUE}=============================================================================${NC}"
    echo -e "${BLUE}                    UPLIFY 3.0 TEST RUNNER${NC}"
    echo -e "${BLUE}=============================================================================${NC}"
    echo ""
}

print_test_info() {
    echo -e "${YELLOW}Running tests in:${NC} $1"
    echo -e "${YELLOW}Progress:${NC} $((TOTAL_TESTS + 1))/${#TEST_DIRS[@]}"
    echo ""
}

print_result() {
    local test_dir="$1"
    local exit_code="$2"

    if [ $exit_code -eq 0 ]; then
        echo -e "${GREEN}✅ PASSED:${NC} $test_dir"
        ((PASSED_TESTS++))
    else
        echo -e "${RED}❌ FAILED:${NC} $test_dir"
        ((FAILED_TESTS++))
        FAILED_FILES+=("$test_dir")
    fi
    echo ""
}

format_duration() {
    local total_seconds="$1"
    local hours=$((total_seconds / 3600))
    local minutes=$(((total_seconds % 3600) / 60))
    local seconds=$((total_seconds % 60))

    if [ $hours -gt 0 ]; then
        echo "${hours}h ${minutes}m ${seconds}s"
    elif [ $minutes -gt 0 ]; then
        echo "${minutes}m ${seconds}s"
    else
        echo "${seconds}s"
    fi
}

print_summary() {
    local elapsed_seconds=$((SECONDS - SCRIPT_START_TIME))
    local elapsed_formatted
    elapsed_formatted=$(format_duration "$elapsed_seconds")

    echo -e "${BLUE}=============================================================================${NC}"
    echo -e "${BLUE}                            SUMMARY${NC}"
    echo -e "${BLUE}=============================================================================${NC}"
    echo -e "${GREEN}Total tests run:${NC} $TOTAL_TESTS"
    echo -e "${GREEN}Passed:${NC} $PASSED_TESTS"
    echo -e "${RED}Failed:${NC} $FAILED_TESTS"
    echo ""

    if [ $FAILED_TESTS -gt 0 ]; then
        echo -e "${RED}Failed test directories:${NC}"
        for dir in "${FAILED_FILES[@]}"; do
            echo -e "${RED}  - $dir${NC}"
        done
        echo ""
        echo -e "${YELLOW}To run a specific failed directory:${NC}"
        echo -e "${YELLOW}./run-tests.sh <directory-path>${NC}"
    else
        echo -e "${GREEN}🎉 All tests passed!${NC}"
    fi
    echo -e "${BLUE}Total execution time:${NC} $elapsed_formatted"
    echo ""
}

run_tests_in_directory() {
    local test_dir="$1"

    print_test_info "$test_dir"

    # Run tests in directory
    # Note: test:unit already has --run flag, so we just pass the directory path
    npm run test:unit -- "$test_dir"
    local exit_code=$?

    print_result "$test_dir" $exit_code
    ((TOTAL_TESTS++))

    return $exit_code
}

# =============================================================================
# MAIN EXECUTION
# =============================================================================

print_header

# Check if specific test directory is provided as argument
if [ $# -gt 0 ]; then
    echo -e "${YELLOW}Running specific directory:${NC} $1"
    echo ""
    run_tests_in_directory "$1"
    exit_code=$?
    elapsed_seconds=$((SECONDS - SCRIPT_START_TIME))
    elapsed_formatted=$(format_duration "$elapsed_seconds")
    echo -e "${BLUE}Total execution time:${NC} $elapsed_formatted"
    exit $exit_code
fi

# Run all tests
echo -e "${YELLOW}Running all test directories sequentially...${NC}"
echo ""

for test_dir in "${TEST_DIRS[@]}"; do
    if [ -d "$test_dir" ]; then
        run_tests_in_directory "$test_dir"
    else
        echo -e "${YELLOW}⚠️  Directory not found:${NC} $test_dir"
        echo ""
    fi
done

print_summary

# Exit with error code if any tests failed
if [ $FAILED_TESTS -gt 0 ]; then
    exit 1
else
    exit 0
fi
